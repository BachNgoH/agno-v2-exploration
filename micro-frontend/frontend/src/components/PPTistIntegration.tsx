'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, Save, Download, Upload } from 'lucide-react';

// Define the state interface
interface PPTistState {
  title: string;
  slides: any[];
  slideCount: number;
  currentSlide: number;
}

// Extend HTMLElement to include our custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'pptist-editor': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'initial-title'?: string;
        'initial-slides'?: string;
        ref?: React.RefObject<HTMLElement>;
      };
    }
  }
}

export default function PPTistIntegration() {
  const pptistRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pptistState, setPptistState] = useState<PPTistState>({
    title: 'My Awesome Presentation',
    slides: [
      {
        id: 'slide-1',
        elements: [
          {
            id: 'title-1',
            type: 'text',
            content: 'Welcome to PPTist Demo',
            style: { fontSize: '48px', fontWeight: 'bold', textAlign: 'center' }
          },
          {
            id: 'subtitle-1',
            type: 'text',
            content: 'Vue.js + Next.js Integration via Web Components',
            style: { fontSize: '24px', textAlign: 'center' }
          }
        ]
      },
      {
        id: 'slide-2',
        elements: [
          {
            id: 'title-2',
            type: 'text',
            content: 'Features',
            style: { fontSize: '36px', fontWeight: 'bold' }
          },
          {
            id: 'content-2',
            type: 'text',
            content: '• Real-time state synchronization\n• Cross-framework communication\n• Modern micro-frontend architecture',
            style: { fontSize: '18px' }
          }
        ]
      },
      {
        id: 'slide-3',
        elements: [
          {
            id: 'title-3',
            type: 'text',
            content: 'Thank You!',
            style: { fontSize: '48px', fontWeight: 'bold', textAlign: 'center' }
          }
        ]
      }
    ],
    slideCount: 3,
    currentSlide: 0
  });

  // Input states for demo controls
  const [newTitle, setNewTitle] = useState(pptistState.title);


  // Load the PPTist Web Component
  useEffect(() => {
    const loadPPTist = async () => {
      try {
        // Create script element to load the Web Component
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'http://127.0.0.1:5174/pptist-webcomponent.es.js';

        script.onload = () => {
          setIsLoaded(true);
        };

        script.onerror = () => {
          setError('Failed to load PPTist Web Component. Make sure the static server is running on port 5174.');
        };

        document.head.appendChild(script);

        return () => {
          document.head.removeChild(script);
        };
      } catch (error) {
        console.error('Failed to load PPTist Web Component:', error);
        setError('Failed to load PPTist Web Component. Make sure the static server is running on port 5174.');
      }
    };

    loadPPTist();
  }, []);

  // Listen for state changes from PPTist
  useEffect(() => {
    const handleStateChange = (event: CustomEvent) => {
      const state = event.detail as PPTistState;
      setPptistState(state);
      setNewTitle(state.title);
    };

    // Listen for custom events
    document.addEventListener('pptist-state-change', handleStateChange as EventListener);

    // Listen for postMessage events (fallback)
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data.type === 'PPTIST_STATE_CHANGE') {
        const state = event.data.payload as PPTistState;
        setPptistState(state);
        setNewTitle(state.title);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      document.removeEventListener('pptist-state-change', handleStateChange as EventListener);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Send state updates to PPTist
  const sendStateToPPTist = useCallback((updates: Partial<PPTistState>) => {
    if (pptistRef.current) {
      // Try to call exposed methods first
      const element = pptistRef.current as any;

      if (updates.title && element.updateTitle) {
        element.updateTitle(updates.title);
      }

      if (updates.slides && element.updateSlides) {
        element.updateSlides(updates.slides);
      }
    }

    // Fallback: Send via postMessage
    const iframe = document.querySelector('iframe');
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({
        type: 'PPTIST_STATE_UPDATE',
        payload: updates
      }, window.location.origin);
    }
  }, []);

  // Demo functions
  const updateTitle = () => {
    if (newTitle !== pptistState.title) {
      sendStateToPPTist({ title: newTitle });
    }
  };

  const resetPresentation = () => {
    const defaultSlides = [
      {
        id: 'slide-1',
        elements: [
          {
            id: 'title-1',
            type: 'text',
            content: 'Welcome to My Presentation',
            style: { fontSize: '48px', fontWeight: 'bold' }
          }
        ]
      }
    ];

    sendStateToPPTist({
      title: 'New Presentation',
      slides: defaultSlides
    });
    setNewTitle('New Presentation');
  };

  const loadSampleData = () => {
    try {
      const sampleSlides = [
        {
          id: 'slide-1',
          elements: [
            { id: 'title-1', type: 'text', content: 'Sample Slide 1', style: {} },
            { id: 'content-1', type: 'text', content: 'This is sample content', style: {} }
          ]
        },
        {
          id: 'slide-2',
          elements: [
            { id: 'title-2', type: 'text', content: 'Sample Slide 2', style: {} }
          ]
        }
      ];

      sendStateToPPTist({
        title: 'Sample Presentation',
        slides: sampleSlides
      });
      setNewTitle('Sample Presentation');
    } catch (error) {
      console.error('Error loading sample data:', error);
    }
  };

  const exportSlides = () => {
    const dataStr = JSON.stringify(pptistState, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `${pptistState.title || 'presentation'}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importSlides = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          sendStateToPPTist(data);
          setNewTitle(data.title || 'Imported Presentation');
        } catch (error) {
          console.error('Error importing slides:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading PPTist</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">To fix this issue:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Navigate to the PPTist directory: <code className="bg-gray-100 px-2 py-1 rounded">cd PPTist</code></li>
              <li>Install dependencies: <code className="bg-gray-100 px-2 py-1 rounded">npm install</code></li>
              <li>Build the Web Component: <code className="bg-gray-100 px-2 py-1 rounded">npm run build-webcomponent</code></li>
              <li>Start the dev server: <code className="bg-gray-100 px-2 py-1 rounded">npm run dev</code></li>
            </ol>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Controls</CardTitle>
            <CardDescription>Modify PPTist from Next.js</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="title-input" className="text-sm font-medium">Update Title:</label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="title-input"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter new title"
                />
                <Button onClick={updateTitle} size="sm">
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Button onClick={loadSampleData} className="w-full" variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Load Sample Data
              </Button>

              <Button onClick={resetPresentation} className="w-full" variant="outline">
                Reset Presentation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Import/Export */}
        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Import/Export presentation data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={exportSlides} className="w-full" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export JSON
            </Button>

            <div>
              <label htmlFor="import-file" className="cursor-pointer">
                <Button asChild className="w-full" variant="outline">
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Import JSON
                  </span>
                </Button>
              </label>
              <input
                id="import-file"
                type="file"
                accept=".json"
                onChange={importSlides}
                className="hidden"
              />
            </div>

            <div className="text-xs text-gray-500">
              <p>Export: Download current state as JSON</p>
              <p>Import: Upload JSON to restore state</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PPTist Web Component */}
      <Card>
        <CardHeader>
          <CardTitle>PPTist Editor</CardTitle>
          <CardDescription>Vue.js presentation editor integrated via Web Components</CardDescription>
        </CardHeader>
        <CardContent>
          {!isLoaded ? (
            <div className="flex items-center justify-center min-h-[600px]">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600">Loading PPTist Web Component...</p>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <pptist-editor
                ref={pptistRef}
                initial-title={pptistState.title}
                initial-slides={JSON.stringify(pptistState.slides)}
                className="block w-full min-h-[700px]"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Raw State Debug */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle>Debug Information</CardTitle>
          <CardDescription>Raw state data for debugging</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="text-xs bg-white p-4 rounded border overflow-x-auto">
            {JSON.stringify(pptistState, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}