"use client";

import Link from "next/link";
import Image from "next/image";
import { meta } from "./meta";
import clsx from "clsx";
import { useChatAvailability } from "@/hooks/useChatAvailability";

export default function CatalogPage() {
  const [general, ...specifics] = meta;
  const { isCheckingStatus, isChatAvailable } = useChatAvailability();

  return (
    <div className="flex-1 flex flex-column align-items-center p-6">
      <div style={{ maxWidth: 1200 }} className="w-full">
        <div className="flex justify-content-between align-items-center">
          <h1 className="text-3xl font-semibold text-gray-800 m-0">Welcome to Kaki Buddy</h1>
        </div>

        <p className="text-gray-600 text-lg mb-5">
          Your friendly AI companion for navigating Singapore government services.
        </p>

        {/* General Assistant Section */}
        <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-3">General Assistant</h2>
        <div className="grid gap-4 mb-6">
          <div className="col-12 sm:col-6 md:col-4">
            <Link
              href={general.href}
              className={clsx(
                "border-1 border-round border-300 h-full p-4 no-underline shadow-sm transition-all duration-200 flex flex-column justify-between gap-4 relative",
                !isChatAvailable ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:surface-100 hover:shadow-md"
              )}
              tabIndex={isChatAvailable ? 0 : -1}
              aria-disabled={!isChatAvailable}
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="text-xl font-medium mb-2 text-gray-800">{general.title}</p>
                  <p className="text-sm text-gray-600 line-height-3">{general.description}</p>
                  <div className="mt-2 flex align-items-center gap-2">
                    <i className="pi pi-volume-up text-sm"></i>
                    <span className="text-sm">Audio Chat</span>
                  </div>
                </div>
                <Image
                  src={general.avatarImage}
                  alt={`${general.title} avatar`}
                  width={100}
                  height={64}
                  className="rounded-full object-cover"
                />
              </div>

              <div className="absolute bottom-3 right-3 flex gap-2 align-items-center">
                <div
                  className={clsx(
                    "border-circle",
                    isCheckingStatus
                      ? "surface-300"
                      : isChatAvailable
                      ? "bg-green-500"
                      : "bg-red-500"
                  )}
                  style={{ width: 10, height: 10 }}
                />
                <p className="m-0 text-color-secondary text-xs">
                  {isCheckingStatus
                    ? "Checking..."
                    : isChatAvailable
                    ? "Available"
                    : "Unavailable"}
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Specific Assistants Section */}
        <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-3">Specific Assistants</h2>
        <div className="grid gap-4">
          {specifics.map(({ title, description, href, avatarImage }) => (
            <div key={href} className="col-12 sm:col-6 md:col-4">
              <Link
                href={href}
                className={clsx(
                  "border-1 border-round border-300 h-full p-4 no-underline shadow-sm transition-all duration-200 flex flex-column justify-between gap-4 relative",
                  !isChatAvailable ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:surface-100 hover:shadow-md"
                )}
                tabIndex={isChatAvailable ? 0 : -1}
                aria-disabled={!isChatAvailable}
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="text-xl font-medium mb-2 text-gray-800">{title}</p>
                    <p className="text-sm text-gray-600 line-height-3">{description}</p>
                    <div className="mt-2 flex align-items-center gap-2">
                      <i className="pi pi-volume-up text-sm"></i>
                      <span className="text-sm">Audio Chat</span>
                    </div>
                  </div>
                  <Image
                    src={avatarImage}
                    alt={`${title} avatar`}
                    width={100}
                    height={64}
                    className="rounded-full object-cover"
                  />
                </div>

                <div className="absolute bottom-3 right-3 flex gap-2 align-items-center">
                  <div
                    className={clsx(
                      "border-circle",
                      isCheckingStatus
                        ? "surface-300"
                        : isChatAvailable
                        ? "bg-green-500"
                        : "bg-red-500"
                    )}
                    style={{ width: 10, height: 10 }}
                  />
                  <p className="m-0 text-color-secondary text-xs">
                    {isCheckingStatus
                      ? "Checking..."
                      : isChatAvailable
                      ? "Available"
                      : "Unavailable"}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
