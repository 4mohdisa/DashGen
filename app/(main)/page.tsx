/* eslint-disable @next/next/no-img-element */
"use client";

import Fieldset from "@/components/fieldset";
import ArrowRightIcon from "@/components/icons/arrow-right";
import LoadingButton from "@/components/loading-button";
import Spinner from "@/components/spinner";
import * as Select from "@radix-ui/react-select";
import assert from "assert";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useState, useRef, useTransition } from "react";
import { createChat } from "./actions";
import { Context } from "./providers";
import Header from "@/components/header";
import { useS3Upload } from "next-s3-upload";
import UploadIcon from "@/components/icons/upload-icon";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { MODELS, SUGGESTED_PROMPTS } from "@/lib/constants";
import { parseDataFile, generateDataPrompt } from "@/lib/data-parser";

export default function Home() {
  const { setStreamPromise } = use(Context);
  const router = useRouter();

  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState(MODELS[0].value);
  const quality = "high"; // Always use high quality
  const [screenshotUrl, setScreenshotUrl] = useState<string | undefined>(
    undefined,
  );
  const [screenshotLoading, setScreenshotLoading] = useState(false);
  const [dataFile, setDataFile] = useState<File | undefined>(undefined);
  const [dataLoading, setDataLoading] = useState(false);
  const selectedModel = MODELS.find((m) => m.value === model);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dataFileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isPending, startTransition] = useTransition();

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 128) + 'px';
    }
  };

  const { uploadToS3 } = useS3Upload();
  const handleScreenshotUpload = async (event: any) => {
    if (prompt.length === 0) setPrompt("Build this");
    setScreenshotLoading(true);
    let file = event.target.files[0];
    const { url } = await uploadToS3(file);
    setScreenshotUrl(url);
    setScreenshotLoading(false);
  };

  const handleDataFileUpload = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setDataLoading(true);
    try {
      const parsedData = await parseDataFile(file);
      setDataFile(file);
      
      // Auto-generate prompt based on data
      const dataPrompt = generateDataPrompt(parsedData, prompt || "Create a comprehensive dashboard");
      setPrompt(dataPrompt);
      
      // Adjust textarea height after setting prompt
      setTimeout(adjustTextareaHeight, 0);
    } catch (error) {
      console.error('Error parsing data file:', error);
      alert(`Error parsing file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setDataLoading(false);
    }
  };


  return (
    <div className="relative flex grow flex-col min-h-screen">
      <div className="isolate flex h-full grow flex-col">
        <Header />

        <div className="mt-10 flex grow flex-col items-center px-4 lg:mt-16 flex-1">

          <div className="relative">
            <h1 className="mt-4 text-balance text-center text-4xl leading-none text-foreground md:text-[64px] lg:mt-8">
              Create stunning{" "}
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold">
                dashboards
              </span>
              <br className="hidden md:block" /> 
              with{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent font-bold">
                AI magic
              </span>
            </h1>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -z-10" />
          </div>
          
          <p className="mt-6 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your ideas into beautiful, interactive dashboards in seconds. 
            Just describe what you need, and watch our AI build it for you.
          </p>

          <form
            className="relative w-full max-w-2xl pt-6 lg:pt-12"
            action={async (formData) => {
              startTransition(async () => {
                const { prompt, model } = Object.fromEntries(formData);

                assert.ok(typeof prompt === "string");
                assert.ok(typeof model === "string");

                // Prepare data context if data file was uploaded
                let dataContext;
                if (dataFile) {
                  try {
                    const parsedData = await parseDataFile(dataFile);
                    dataContext = {
                      dataColumns: parsedData.headers,
                      dataTypes: parsedData.dataTypes,
                      userPrompt: prompt,
                    };
                  } catch (error) {
                    console.error('Error parsing data for context:', error);
                  }
                }

                const { chatId, lastMessageId } = await createChat(
                  prompt,
                  model,
                  quality,
                  screenshotUrl,
                  dataContext,
                );

                const streamPromise = fetch(
                  "/api/get-next-completion-stream-promise",
                  {
                    method: "POST",
                    body: JSON.stringify({ messageId: lastMessageId, model }),
                  },
                ).then((res) => {
                  if (!res.body) {
                    throw new Error("No body on response");
                  }
                  return res.body;
                });

                startTransition(() => {
                  setStreamPromise(streamPromise);
                  router.push(`/chats/${chatId}`);
                });
              });
            }}
          >
            <Fieldset>
              <div className="relative flex w-full max-w-2xl rounded-2xl border-2 border-border/50 bg-card/90 backdrop-blur-md shadow-2xl shadow-black/5 dark:shadow-black/20 pb-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10" />
                <div className="w-full relative z-10">
                  {screenshotLoading && (
                    <div className="relative mx-3 mt-3">
                      <div className="rounded-xl">
                        <div className="group mb-2 flex h-16 w-[68px] animate-pulse items-center justify-center rounded bg-muted">
                          <Spinner />
                        </div>
                      </div>
                    </div>
                  )}
                  {screenshotUrl && (
                    <div
                      className={`${isPending ? "invisible" : ""} relative mx-3 mt-3`}
                    >
                      <div className="rounded-xl">
                        <img
                          alt="screenshot"
                          src={screenshotUrl}
                          className="group relative mb-2 h-16 w-[68px] rounded"
                        />
                      </div>
                      <button
                        type="button"
                        id="x-circle-icon"
                        className="absolute -right-3 -top-4 left-14 z-10 size-5 rounded-full bg-card text-foreground hover:text-muted-foreground"
                        onClick={() => {
                          setScreenshotUrl(undefined);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                      >
                        <XCircleIcon />
                      </button>
                    </div>
                  )}
                  {dataLoading && (
                    <div className="relative mx-3 mt-3">
                      <div className="rounded-xl">
                        <div className="group mb-2 flex h-16 w-[68px] animate-pulse items-center justify-center rounded bg-muted">
                          <Spinner />
                        </div>
                      </div>
                    </div>
                  )}
                  {dataFile && (
                    <div
                      className={`${isPending ? "invisible" : ""} relative mx-3 mt-3`}
                    >
                      <div className="rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-border/30">
                        <div className="group relative mb-2 h-16 w-[68px] rounded flex items-center justify-center">
                          <div className="text-2xl">📊</div>
                          <div className="absolute bottom-0 left-0 right-0 text-[10px] text-center text-muted-foreground bg-background/80 rounded-b">
                            {dataFile.name.split('.').pop()?.toUpperCase()}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="absolute -right-3 -top-4 left-14 z-10 size-5 rounded-full bg-card text-foreground hover:text-muted-foreground"
                        onClick={() => {
                          setDataFile(undefined);
                          if (dataFileInputRef.current) {
                            dataFileInputRef.current.value = "";
                          }
                          // Reset prompt if it was auto-generated
                          setPrompt("");
                        }}
                      >
                        <XCircleIcon />
                      </button>
                    </div>
                  )}
                  <div className="relative">
                    <textarea
                      ref={textareaRef}
                      placeholder="✨ Build me a beautiful sales dashboard with charts and metrics..."
                      required
                      name="prompt"
                      className={`w-full resize-none bg-transparent p-3 placeholder-muted-foreground/70 text-foreground focus-visible:outline-none disabled:opacity-50 text-base transition-opacity duration-200 min-h-[44px] max-h-32 overflow-y-auto ${isPending ? 'opacity-0' : 'opacity-100'}`}
                      value={prompt}
                      onChange={(e) => {
                        setPrompt(e.target.value);
                        adjustTextareaHeight();
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          const target = event.target;
                          if (!(target instanceof HTMLTextAreaElement)) return;
                          target.closest("form")?.requestSubmit();
                        }
                      }}
                      disabled={isPending}
                      style={{
                        height: 'auto',
                        minHeight: '44px',
                        maxHeight: '8rem'
                      }}
                    />
                  </div>
                </div>
                <div className={`absolute bottom-2 left-2 right-2.5 flex items-center justify-between transition-opacity duration-200 ${isPending ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="flex items-center gap-3">
                    <Select.Root
                      name="model"
                      value={model}
                      onValueChange={setModel}
                    >
                      <Select.Trigger className="inline-flex items-center gap-1 rounded-md p-1 text-sm text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
                        <Select.Value aria-label={model}>
                          <span>{selectedModel?.label}</span>
                        </Select.Value>
                        <Select.Icon>
                          <ChevronDownIcon className="size-3" />
                        </Select.Icon>
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Content className="overflow-hidden rounded-md bg-popover shadow-lg ring-1 ring-border">
                          <Select.Viewport className="space-y-1 p-2">
                            {MODELS.map((m) => (
                              <Select.Item
                                key={m.value}
                                value={m.value}
                                className="flex cursor-pointer items-center gap-1 rounded-md p-1 text-sm data-[highlighted]:bg-accent data-[highlighted]:outline-none"
                              >
                                <Select.ItemText className="inline-flex items-center gap-2 text-popover-foreground">
                                  {m.label}
                                </Select.ItemText>
                                <Select.ItemIndicator>
                                  <CheckIcon className="size-3 text-blue-400" />
                                </Select.ItemIndicator>
                              </Select.Item>
                            ))}
                          </Select.Viewport>
                          <Select.ScrollDownButton />
                          <Select.Arrow />
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>

                    <div className="h-4 w-px bg-border max-sm:hidden" />
                    
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <div className="size-2 rounded-full bg-green-500"></div>
                      High Quality
                    </div>
                    <div className="h-4 w-px bg-border max-sm:hidden" />
                    <div>
                      <label
                        htmlFor="screenshot"
                        className="flex cursor-pointer gap-2 text-sm text-muted-foreground hover:underline"
                      >
                        <div className="flex size-6 items-center justify-center rounded bg-muted hover:bg-accent">
                          <UploadIcon className="size-4" />
                        </div>
                        <div className="flex items-center justify-center transition hover:text-foreground">
                          Attach
                        </div>
                      </label>
                      <input
                        // name="screenshot"
                        id="screenshot"
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleScreenshotUpload}
                        className="hidden"
                        ref={fileInputRef}
                      />
                    </div>
                    
                    <div className="h-4 w-px bg-border max-sm:hidden" />
                    <div>
                      <label
                        htmlFor="datafile"
                        className="flex cursor-pointer gap-2 text-sm text-muted-foreground hover:underline"
                      >
                        <div className="flex size-6 items-center justify-center rounded bg-muted hover:bg-accent">
                          📊
                        </div>
                        <div className="flex items-center justify-center transition hover:text-foreground">
                          Data
                        </div>
                      </label>
                      <input
                        id="datafile"
                        type="file"
                        accept=".csv,.json,.xlsx,.xls"
                        onChange={handleDataFileUpload}
                        className="hidden"
                        ref={dataFileInputRef}
                      />
                    </div>
                  </div>

                  <div className="relative flex shrink-0 has-[:disabled]:opacity-50">
                    <div className="pointer-events-none absolute inset-0 -bottom-[1px] rounded-lg bg-gradient-to-r from-blue-600 to-purple-600" />

                    <LoadingButton
                      className="relative inline-flex size-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 font-medium text-white shadow-lg outline-blue-400 hover:from-blue-700 hover:to-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-200 hover:shadow-xl hover:scale-105"
                      type="submit"
                    >
                      <ArrowRightIcon className="w-4 h-4" />
                    </LoadingButton>
                  </div>
                </div>

                {isPending && (
                  <div className="absolute inset-0 rounded-xl overflow-hidden">
                    <LoadingMessage
                      isHighQuality={quality === "high"}
                      screenshotUrl={screenshotUrl}
                    />
                  </div>
                )}
              </div>
              <div className="mt-6 flex w-full flex-wrap justify-center gap-3">
                {SUGGESTED_PROMPTS.map((v) => (
                  <button
                    key={v.title}
                    type="button"
                    onClick={() => setPrompt(v.description)}
                    className="group relative rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 px-4 py-2.5 text-sm font-medium text-foreground border border-border/50 hover:border-blue-300 dark:hover:border-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-all duration-200 hover:shadow-md hover:scale-105"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-200" />
                    <span className="relative z-10">{v.title}</span>
                  </button>
                ))}
              </div>
            </Fieldset>
          </form>
        </div>

        {/* Fixed Footer */}
        <footer className="mt-auto flex w-full flex-col items-center justify-between space-y-3 px-5 pb-6 pt-5 text-center sm:flex-row sm:pt-2 border-t border-border/50 bg-background/80 backdrop-blur-sm">
          <div>
            <div className="font-medium text-muted-foreground">
              Powered by{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DashGen AI
              </span>
              {" "}– Create amazing dashboards instantly
            </div>
          </div>
          <div className="flex space-x-4 pb-4 sm:pb-0">
            <Link
              href="https://twitter.com/4mohdisa"
              className="group p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Twitter"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5 fill-muted-foreground group-hover:fill-blue-500 transition-colors"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.093 4.093 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.615 11.615 0 0 0 6.29 1.84" />
              </svg>
            </Link>
            <Link
              href="https://github.com/4mohdisa"
              className="group p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="GitHub"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5 fill-muted-foreground group-hover:fill-foreground transition-colors"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

function LoadingMessage({
  isHighQuality,
  screenshotUrl,
}: {
  isHighQuality: boolean;
  screenshotUrl: string | undefined;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-card backdrop-blur-lg px-1 py-3 md:px-3 z-20 border border-border/50">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <Spinner />
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-ping" />
        </div>
        
        <div className="space-y-2">
          <p className="text-foreground font-medium text-sm md:text-base">
            {isHighQuality
              ? "🧠 Planning your dashboard..."
              : screenshotUrl
                ? "👁️ Analyzing your screenshot..."
                : "✨ Creating your dashboard..."}
          </p>
          <p className="text-muted-foreground text-xs md:text-sm">
            {isHighQuality
              ? "Using advanced AI to create the perfect layout"
              : screenshotUrl
                ? "Understanding your design requirements"
                : "This will only take a moment"}
          </p>
        </div>
      </div>
    </div>
  );
}

export const runtime = "edge";
export const maxDuration = 45;
