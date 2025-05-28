'use client';

import { Suspense } from "react";
import ScenarioContent from "@/components/ScenarioContent";
import { scenarios } from "@/config/scenarios";

function TemusAvatarSocialPage() {
  const scenario = scenarios.find(s => s.id === 'temus-avatar-social')!;
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScenarioContent
        title={scenario.title}
        description={scenario.description}
        startMessage={scenario.startMessage}
        prompt={scenario.prompt}
        avatar={scenario.avatar}
        backgroundImageUrl={scenario.backgroundImageUrl}
        voice={scenario.voice}
      />
    </Suspense>
  );
}

export default TemusAvatarSocialPage