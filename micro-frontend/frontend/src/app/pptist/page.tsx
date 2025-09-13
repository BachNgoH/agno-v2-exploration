'use client';

import { Suspense } from 'react';
import PPTistIntegration from '@/components/PPTistIntegration';

export default function PPTistPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          PPTist Integration Demo
        </h1>

        <div className="text-center mb-6 text-gray-600">
          <p>
            This demonstrates the integration of PPTist (Vue.js) with Next.js using Web Components.
          </p>
          <p>
            The title and slides data are synchronized between Vue and React in real-time.
          </p>
        </div>

        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[600px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <PPTistIntegration />
        </Suspense>
      </div>
    </div>
  );
}