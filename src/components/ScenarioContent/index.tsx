"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Conversation from "@/components/Conversation";
import VideoChatControls from "@/components/VideoChatControls";
import ThinkingState from "@/components/ThinkingState";
import { Button } from "primereact/button";

interface ScenarioContentProps {
  title: string;
  description: string;
  startMessage: string;
  prompt: string;
  avatar: string;
  backgroundImageUrl: string;
  voice: string;
}

const generateShortId = () => {
  const randomNum = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
  return `${randomNum}`;
};

export default function ScenarioContent({
  title,
  description,
  startMessage,
  prompt,
  avatar,
  backgroundImageUrl,
  voice,
}: ScenarioContentProps) {
  const router = useRouter();
  const [conversationId] = useState(generateShortId());
  const [hasStarted, setHasStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [thinkingState, setThinkingState] = useState<boolean>(false);
  const audioTrackRef = useRef<MediaStreamTrack | null>(null);

  useEffect(() => {
    setHasStarted(true); // auto-start chat immediately on mount
  }, []);

  const handleConversationEnd = async () => {
    if (audioTrackRef.current) {
      audioTrackRef.current.stop();
      audioTrackRef.current = null;
    }

    setHasStarted(false);
    router.push("/");
  };

  const handleBack = () => {
    if (audioTrackRef.current) {
      audioTrackRef.current.stop();
      audioTrackRef.current = null;
    }
    router.push("/");
  };

  return (
    <div className="relative w-full h-full">
      <Button
        icon="pi pi-arrow-left"
        onClick={handleBack}
        className="absolute m-4 z-10"
        rounded
        text
        size="large"
        severity="secondary"
      />
      <div className="flex-1 w-full h-full flex justify-content-center">
        {!hasStarted ? (
          // This block likely never shows now
          <div
            className="h-full w-full flex flex-column align-items-center justify-content-center gap-4 p-4"
            style={{ maxWidth: 600 }}
          >
            <h1 className="text-3xl font-semibold text-gray-800 text-center m-0">{title}</h1>
            <p className="text-lg text-gray-600 text-center line-height-3 m-0">{description}</p>
          </div>
        ) : (
          <div className="absolute top-0 left-0 right-0 bottom-0 z-5 surface-900">
            <Conversation
              conversationId={conversationId}
              startMessage={startMessage}
              prompt={prompt}
              avatar={avatar}
              backgroundImageUrl={backgroundImageUrl}
              voice={voice}
              muted={muted}
              setThinkingState={setThinkingState}
              onConversationEnd={handleConversationEnd}
              audioTrack={audioTrackRef.current}
            >
              {thinkingState && <ThinkingState />}
              <VideoChatControls
                muted={muted}
                setMuted={setMuted}
                onMuteClick={() => setMuted((curr) => !curr)}
                onExitClick={handleConversationEnd}
              />
            </Conversation>
          </div>
        )}
      </div>
    </div>
  );
}
