# Latest Microfrontend Best Practices & Trends (2025) - Complete Research Summary

## 🚨 **CRITICAL UPDATE: Next.js NOT Recommended for Microfrontends**

**The Module Federation team officially recommends against using Next.js for microfrontends as of 2025.**

See detailed warning in the Next.js section below. **Use Modern.js, Rsbuild, or other alternatives instead.**

## 🔥 **Latest Architecture Patterns & Trends**

### **Vertical vs Horizontal Split Evolution**
- **Vertical Split (Feature-based)**: Splitting by business capabilities (product catalog, cart, checkout) - now the preferred approach
- **Horizontal Split (Technical Layer-based)**: Splitting by UI layers (header, footer, content) - falling out of favor
- **Single Module Per Page Pattern**: Loading one primary module per page for simplified integration and better performance

### **Next.js Multi-Zones Pattern**
Independent Next.js applications rendering on a common domain - ideal for large teams with clear page groupings where cross-navigation is minimal.

## 🚀 **Module Federation 2.0 & Performance Breakthroughs**

### **Rspack Integration (5x Performance Gains)**
- **Cold builds**: Up to 5-10x faster than Webpack
- **Development builds**: Typically under 150ms cold start
- **Cross-platform compatibility**: Webpack and Rspack can share code using centralized runtime

### **Module Federation 2.0 Features**
- **Runtime plugin functionality**: Users can extend MF behavior without additional plugins
- **Dynamic type hints**: Enhanced developer experience with Chrome DevTools integration
- **Auto-generated types**: Consumer apps generate types from remotes in @mf-types directory
- **Mobile support**: React Native with ModuleFederationV2Plugin

### **Native Federation Evolution**
Portable, bundler-agnostic implementation leveraging web standards, particularly strong with Angular's new esbuild-based ApplicationBuilder.

## 🚨 **CRITICAL WARNING: Next.js + Module Federation Issues (2025)**

### **⚠️ Major Problems Identified**
Based on [GitHub Issue #3153](https://github.com/module-federation/core/issues/3153), there are **severe limitations** with Next.js + Module Federation:

#### **Core Issues:**
1. **Lack of Native Support**: Vercel has not actively collaborated on implementing Module Federation in Next.js
2. **Years of Fighting the Framework**: Ongoing compatibility issues with limited framework cooperation
3. **Maintenance Nightmare**: Significant development effort required to maintain support
4. **Limited Functionality**:
   - Next.js builds cannot generate remote entry files
   - Remotes must use identical dependency versions as hosts
   - **Next.js can essentially only act as a host system**

#### **Official Recommendation from Module Federation Team:**
> **"If you are exploring microfrontends, _do not_ use Next.js!"**

#### **Support Timeline:**
- **Current support until mid-to-end of 2026**
- **Potential early retirement** if significant breaking changes occur
- **Module Federation support for Next.js is being deprecated**

### **Recommended Alternatives (2025)**
Instead of Next.js + Module Federation, consider:

1. **Modern.js** - Expected RSC + Federation support in 2025
2. **Remix** - Better microfrontend support
3. **TanStack** - Flexible architecture
4. **Nuxt** - Vue-based alternative with better federation support
5. **Rsbuild** - Direct Rspack integration without framework limitations

### **If You Must Use Next.js: Proven Alternative Patterns**

Since Module Federation is not viable with Next.js, here are the **best working approaches** for 2025:

#### **1. 🌟 Next.js Multi-Zones (Recommended)**
- **Best for**: Route-based separation, team autonomy, natural app boundaries
- **How it works**: Independent Next.js apps under single domain with routing
- **Benefits**: Simple deployment, full Next.js features per zone, good SEO
- **Limitations**: Full page refresh between zones, no runtime component sharing

#### **2. 🔄 Server-Side Composition**
- **Best for**: Page-level composition, headless CMS integration, SSG/SSR needs
- **How it works**: Compose HTML fragments via Edge APIs or server routes
- **Benefits**: Better SEO, leverages Next.js SSR/SSG, good performance
- **Implementation**: NGINX reverse proxy + multiple Next.js instances

#### **3. 🖼️ Iframe Embedding**
- **Best for**: Legacy integration, widget-like components, quick prototyping
- **How it works**: Embed microfrontends as iframes within pages
- **Benefits**: Complete isolation, quick integration, security boundaries
- **Limitations**: Performance overhead, UX constraints, styling challenges

#### **4. 🏝️ Islands Architecture (with Astro)**
- **Best for**: Static-first approach, partial hydration, multi-framework needs
- **How it works**: Server-first with selective client-side hydration
- **Benefits**: Zero-JS by default, framework-agnostic islands
- **Use case**: Complement Next.js with Astro for specific sections

## 🛠️ **Leading Framework Ecosystem**

### **Top Frameworks (2025 Rankings)**
1. **Single-SPA**: JavaScript framework for frontend microservices with lifecycle management
2. **Qiankun**: Built on Single-SPA, serves 200+ production apps at Ant, production-ready
3. **Bit**: Shareable components across apps - microfrontend and component library combined
4. **Piral**: Portal applications with decoupled Pilets, focuses on developer experience
5. **Module Federation**: Runtime flexibility standard for modern applications

### **Market Growth**
Global Microservices Architecture Market projected to grow from $5.9B (2020) to $21.1B (2025) at 28.3% CAGR.

## ⚡ **Performance Optimization Revolution**

### **2025 Performance Priorities**
- **Focus shift**: From bundle size to JavaScript execution time
- **Edge-first frameworks**: Qwik and Marko with zero-JS/minimal-JS by default
- **Real User Monitoring (RUM)**: Essential with Chrome UX Report (CrUX) for real Core Web Vitals

### **Advanced Lazy Loading**
- **Component-level**: Lazy load carousels, modals, dashboards
- **Predictive prefetching**: Preload JS for likely next pages without affecting initial load
- **Third-party script fencing**: Load only after user gestures/consent

### **Smart Bundle Splitting**
- **Performance budgets**: Tools throw warnings when bundles exceed limits
- **Above-the-fold optimization**: Load only viewport elements first
- **Rule of thumb**: Good microfrontend = <50kB, <4 network requests

### **Cache Strategy Evolution**
- **Long-term caching**: Extract stable third-party libraries separately
- **Hash-based updates**: Only updated bundles with different hashes download
- **HTTP/3 adoption**: Protocol-level optimizations for faster network throughput

## 🔐 **Security Best Practices (2025)**

### **Content Security Policy (CSP) Strict Mode**
- **Strict CSP**: Easier to deploy, more secure, less likely to be bypassed
- **Frame-ancestors**: Set to 'none' unless embedding needed, prevents clickjacking
- **Sandbox directive**: Restricts iframe capabilities, minimal permissions approach

### **CORS & Domain Isolation**
- **Access-Control-Allow-Origin**: Properly configured to avoid opaque responses
- **Predictable domains**: Deploy microfrontends to isolated, predictable domains
- **Approved source lists**: Maintain and restrict content loading to trusted domains

### **Iframe Security (2025 Standards)**
- **HTTPS enforcement**: All iframe content over encrypted connections
- **Sandbox attributes**: Minimal permissions (`allow-scripts`, `allow-forms`, `allow-same-origin`)
- **Monitoring systems**: Detect changes in iframe behavior, especially for payments/auth

### **Compliance & Monitoring**
- **PCI DSS 4.0**: Controls 6.4.3 and 11.6.1 for payment implementations
- **CSP reporting**: Use report-to directive for violation monitoring
- **Defense in depth**: CSP as second layer, not primary defense

## 🏗️ **Implementation Recommendations (2025)**

### **Technology Stack Priority (Updated 2025)**
1. **For performance-critical apps**: Rspack + Module Federation 2.0 (avoid Next.js)
2. **For React-based microfrontends**: Modern.js or Rsbuild + Module Federation 2.0
3. **For enterprise**: Qiankun (production-proven with 200+ apps)
4. **For component sharing**: Bit.dev
5. **For portal apps**: Piral
6. **⚠️ AVOID: Next.js + @module-federation/nextjs-mf** (deprecated, severe limitations)

### **Migration Strategy**
- **Start simple**: Module Federation for runtime integration
- **Progressive adoption**: Begin with simpler approaches, evolve to MF
- **Monorepo benefits**: Use Turborepo for shared code and automated deployment
- **Version management**: Changesets for multi-repo code sharing

### **Key Success Factors**
- **Team autonomy**: Enable independent development/deployment
- **Clear contracts**: Define interfaces between microfrontends
- **Shared dependencies**: Singleton patterns for React/common libraries
- **Health checks**: Implement monitoring and error boundaries
- **Gradual migration**: Move from monolith incrementally

## 🚀 **Next.js Microfrontend Implementation Alternatives (2025)**

### **1. Next.js Multi-Zones Implementation**

#### **Architecture Overview**
```
Domain: example.com
├── /app (Shell - Next.js App A)
├── /products (Product Team - Next.js App B)
├── /cart (Cart Team - Next.js App C)
└── /profile (Profile Team - Next.js App D)
```

#### **NGINX Configuration**
```nginx
# /etc/nginx/nginx.conf
upstream shell_app {
    server localhost:3000;
}

upstream product_app {
    server localhost:3001;
}

upstream cart_app {
    server localhost:3002;
}

upstream profile_app {
    server localhost:3003;
}

server {
    listen 80;
    server_name example.com;

    # Route to Shell App (default)
    location / {
        proxy_pass http://shell_app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Route to Product App
    location /products {
        proxy_pass http://product_app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Route to Cart App
    location /cart {
        proxy_pass http://cart_app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Route to Profile App
    location /profile {
        proxy_pass http://profile_app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Static asset optimization
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
```

#### **Next.js App Configuration (Zone)**
```javascript
// products/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/products',
  assetPrefix: '/products',
  trailingSlash: true,

  async rewrites() {
    return [
      // Rewrite to other zones
      {
        source: '/cart/:path*',
        destination: 'http://localhost:3002/cart/:path*',
      },
      {
        source: '/profile/:path*',
        destination: 'http://localhost:3003/profile/:path*',
      }
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Zone',
            value: 'products',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

#### **Cross-Zone Navigation**
```jsx
// shared/navigation.js
export const navigateToZone = (path) => {
  // Full page navigation between zones
  window.location.href = path;
};

// components/Navigation.jsx
import Link from 'next/link';
import { navigateToZone } from '../shared/navigation';

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <a onClick={() => navigateToZone('/products')}>Products</a>
      <a onClick={() => navigateToZone('/cart')}>Cart</a>
      <a onClick={() => navigateToZone('/profile')}>Profile</a>
    </nav>
  );
}
```

### **2. Server-Side Composition Implementation**

#### **Edge Function Composition**
```javascript
// middleware.js (Vercel Edge Function)
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Compose different microfrontends server-side
  if (pathname.startsWith('/dashboard')) {
    return await composeDashboard(request);
  }

  return NextResponse.next();
}

async function composeDashboard(request) {
  const [headerHTML, sidebarHTML, contentHTML] = await Promise.all([
    fetch('http://header-service:3001/render'),
    fetch('http://sidebar-service:3002/render'),
    fetch('http://content-service:3003/render'),
  ]);

  const composedHTML = `
    <html>
      <body>
        <div id="header">${await headerHTML.text()}</div>
        <div id="sidebar">${await sidebarHTML.text()}</div>
        <div id="content">${await contentHTML.text()}</div>
      </body>
    </html>
  `;

  return new Response(composedHTML, {
    headers: { 'content-type': 'text/html' },
  });
}

export const config = {
  matcher: '/dashboard/:path*',
};
```

#### **API Route Composition (App Router)**
```javascript
// app/api/compose/[...path]/route.js
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { path } = params;
  const route = Array.isArray(path) ? path.join('/') : path;

  try {
    // Fetch from multiple microfrontend services
    const services = {
      header: 'http://header-service:3001',
      content: 'http://content-service:3002',
      footer: 'http://footer-service:3003',
    };

    const fragments = await Promise.all(
      Object.entries(services).map(async ([name, url]) => {
        const response = await fetch(`${url}/api/${route}`);
        return { name, html: await response.text() };
      })
    );

    const composedPage = fragments.reduce((acc, fragment) => {
      return acc.replace(`<!--${fragment.name}-->`, fragment.html);
    }, pageTemplate);

    return new NextResponse(composedPage, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Composition failed' },
      { status: 500 }
    );
  }
}

const pageTemplate = `
<!DOCTYPE html>
<html>
  <head><title>Composed Page</title></head>
  <body>
    <!--header-->
    <main><!--content--></main>
    <!--footer-->
  </body>
</html>
`;
```

### **3. Enhanced Iframe Implementation**

#### **Smart Iframe Component**
```jsx
// components/MicrofrontendIframe.jsx
import { useEffect, useRef, useState } from 'react';

export default function MicrofrontendIframe({
  src,
  title,
  onLoad,
  sandbox = "allow-scripts allow-same-origin"
}) {
  const iframeRef = useRef(null);
  const [height, setHeight] = useState(400);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const iframe = iframeRef.current;

    const handleMessage = (event) => {
      // Security: Verify origin
      if (event.origin !== new URL(src).origin) return;

      if (event.data.type === 'RESIZE') {
        setHeight(event.data.height);
      }

      if (event.data.type === 'NAVIGATE') {
        // Handle navigation requests from iframe
        window.location.href = event.data.url;
      }
    };

    const handleLoad = () => {
      setIsLoading(false);
      onLoad?.();
    };

    window.addEventListener('message', handleMessage);
    iframe?.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('message', handleMessage);
      iframe?.removeEventListener('load', handleLoad);
    };
  }, [src, onLoad]);

  return (
    <div className="microfrontend-container">
      {isLoading && (
        <div className="loading-skeleton">Loading {title}...</div>
      )}
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        sandbox={sandbox}
        style={{
          width: '100%',
          height: `${height}px`,
          border: 'none',
          display: isLoading ? 'none' : 'block'
        }}
        allow="camera; microphone; geolocation"
      />
    </div>
  );
}
```

#### **Iframe Communication System**
```javascript
// Inside iframe (microfrontend)
const sendMessage = (type, data) => {
  window.parent.postMessage({ type, ...data }, '*');
};

// Auto-resize iframe
const observer = new ResizeObserver(() => {
  sendMessage('RESIZE', { height: document.body.scrollHeight });
});
observer.observe(document.body);

// Navigation from iframe
const navigate = (url) => {
  sendMessage('NAVIGATE', { url });
};
```

### **4. State Management Across Zones/Compositions**

#### **Cross-Zone State Sync**
```javascript
// utils/crossZoneState.js
class CrossZoneState {
  constructor() {
    this.listeners = new Map();
    this.setupStorageListener();
  }

  setupStorageListener() {
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key?.startsWith('zone-state:')) {
          const listeners = this.listeners.get(e.key);
          listeners?.forEach(callback =>
            callback(JSON.parse(e.newValue))
          );
        }
      });
    }
  }

  setState(key, value) {
    const storeKey = `zone-state:${key}`;
    localStorage.setItem(storeKey, JSON.stringify(value));

    // Notify current zone listeners
    const listeners = this.listeners.get(storeKey);
    listeners?.forEach(callback => callback(value));
  }

  getState(key) {
    const storeKey = `zone-state:${key}`;
    const value = localStorage.getItem(storeKey);
    return value ? JSON.parse(value) : null;
  }

  subscribe(key, callback) {
    const storeKey = `zone-state:${key}`;
    if (!this.listeners.has(storeKey)) {
      this.listeners.set(storeKey, new Set());
    }
    this.listeners.get(storeKey).add(callback);

    return () => {
      this.listeners.get(storeKey)?.delete(callback);
    };
  }
}

export const crossZoneState = new CrossZoneState();
```

#### **React Hook for Cross-Zone State**
```jsx
// hooks/useCrossZoneState.js
import { useState, useEffect } from 'react';
import { crossZoneState } from '../utils/crossZoneState';

export function useCrossZoneState(key, initialValue) {
  const [value, setValue] = useState(() =>
    crossZoneState.getState(key) ?? initialValue
  );

  useEffect(() => {
    const unsubscribe = crossZoneState.subscribe(key, setValue);
    return unsubscribe;
  }, [key]);

  const updateValue = (newValue) => {
    crossZoneState.setState(key, newValue);
  };

  return [value, updateValue];
}

// Usage in any zone
function CartCounter() {
  const [cartItems, setCartItems] = useCrossZoneState('cart', []);

  return (
    <div>
      Cart ({cartItems.length})
      <button onClick={() => setCartItems([...cartItems, 'item'])}>
        Add Item
      </button>
    </div>
  );
}
```

## 🔄 **Cross-Framework Integration: Vue.js + Next.js**

### **Scenario: Integrating Vue App with Next.js Shell**

#### **1. Multi-Zone Approach (Recommended)**

**Architecture:**
```
example.com
├── / (Next.js Shell - React)
├── /dashboard (Vue.js App)
├── /admin (Vue.js App)
└── /api (Next.js API Routes)
```

**Vue App Configuration:**
```javascript
// vue-dashboard/vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: '/dashboard/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 3001,
    cors: true
  }
});
```

**Next.js Proxy Configuration:**
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Proxy Vue.js dashboard
      {
        source: '/dashboard/:path*',
        destination: 'http://localhost:3001/dashboard/:path*'
      },
      // Proxy Vue.js admin
      {
        source: '/admin/:path*',
        destination: 'http://localhost:3002/admin/:path*'
      }
    ];
  },

  async headers() {
    return [
      {
        source: '/dashboard/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
```

#### **2. Iframe Integration with Vue.js**

**Smart Vue Iframe Component (Next.js):**
```jsx
// components/VueAppIframe.jsx
import { useEffect, useRef, useState } from 'react';

export default function VueAppIframe({
  vuePath = '/dashboard',
  title = 'Vue Dashboard'
}) {
  const iframeRef = useRef(null);
  const [height, setHeight] = useState(600);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMessage = (event) => {
      // Accept messages from Vue app
      if (event.origin !== window.location.origin) return;

      switch (event.data.type) {
        case 'VUE_RESIZE':
          setHeight(event.data.height);
          break;
        case 'VUE_NAVIGATION':
          // Handle Vue navigation in Next.js
          window.history.pushState({}, '', event.data.route);
          break;
        case 'VUE_READY':
          setIsLoading(false);
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const sendToVue = (data) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'NEXTJS_MESSAGE',
        ...data
      }, window.location.origin);
    }
  };

  return (
    <div className="vue-app-container">
      {isLoading && (
        <div className="loading-spinner">Loading Vue Dashboard...</div>
      )}

      <iframe
        ref={iframeRef}
        src={vuePath}
        title={title}
        style={{
          width: '100%',
          height: `${height}px`,
          border: 'none',
          display: isLoading ? 'none' : 'block'
        }}
        onLoad={() => {
          // Send initial data to Vue app
          sendToVue({
            user: 'currentUser',
            theme: 'dark',
            permissions: ['read', 'write']
          });
        }}
      />
    </div>
  );
}
```

**Vue App Communication Setup:**
```javascript
// vue-dashboard/src/utils/parentCommunication.js
class ParentCommunication {
  constructor() {
    this.setupMessageListener();
    this.sendReady();
  }

  setupMessageListener() {
    window.addEventListener('message', (event) => {
      if (event.origin !== window.location.origin) return;

      if (event.data.type === 'NEXTJS_MESSAGE') {
        this.handleNextJSMessage(event.data);
      }
    });
  }

  handleNextJSMessage(data) {
    // Handle messages from Next.js
    if (data.user) {
      // Update Vue store with user data
      this.updateStore('user', data.user);
    }

    if (data.theme) {
      // Apply theme to Vue app
      document.body.className = `theme-${data.theme}`;
    }
  }

  sendToParent(type, data = {}) {
    window.parent.postMessage({
      type: `VUE_${type}`,
      ...data
    }, window.location.origin);
  }

  sendReady() {
    this.sendToParent('READY');
  }

  sendResize() {
    const height = document.body.scrollHeight;
    this.sendToParent('RESIZE', { height });
  }

  sendNavigation(route) {
    this.sendToParent('NAVIGATION', { route });
  }

  updateStore(key, value) {
    // Update Pinia or Vuex store
    // This depends on your Vue state management
  }
}

export const parentComm = new ParentCommunication();
```

**Vue Router Integration:**
```javascript
// vue-dashboard/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { parentComm } from '../utils/parentCommunication';

const router = createRouter({
  history: createWebHistory('/dashboard/'),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: '/analytics',
      name: 'Analytics',
      component: () => import('../views/Analytics.vue')
    }
  ]
});

// Notify parent of route changes
router.afterEach((to) => {
  parentComm.sendNavigation(`/dashboard${to.path}`);
});

export default router;
```

#### **3. Server-Side Composition with Vue SSR**

**Vue SSR Service:**
```javascript
// vue-ssr-service/server.js
import { createSSRApp } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { createRouter, createWebHistory } from 'vue-router';
import express from 'express';

const app = express();

app.get('/api/render', async (req, res) => {
  try {
    const { component, props = {} } = req.query;

    const vueApp = createSSRApp({
      template: `<div id="vue-content"><${component} v-bind="props" /></div>`,
      data() {
        return { props };
      }
    });

    const html = await renderToString(vueApp);

    res.json({
      html,
      css: '', // Add CSS if needed
      dependencies: ['vue'] // List dependencies
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Vue SSR service running on port 3001');
});
```

**Next.js Integration:**
```jsx
// pages/hybrid-page.jsx
import { useState, useEffect } from 'react';

export async function getServerSideProps() {
  try {
    // Fetch Vue component HTML at build time
    const vueResponse = await fetch('http://vue-ssr-service:3001/api/render?component=Dashboard&props={}');
    const vueData = await vueResponse.json();

    return {
      props: {
        vueHTML: vueData.html,
        vueDependencies: vueData.dependencies
      }
    };
  } catch (error) {
    return {
      props: {
        vueHTML: '<div>Vue component failed to load</div>',
        vueDependencies: []
      }
    };
  }
}

export default function HybridPage({ vueHTML, vueDependencies }) {
  const [isVueHydrated, setIsVueHydrated] = useState(false);

  useEffect(() => {
    // Hydrate Vue component on client side
    import('vue').then(async ({ createApp }) => {
      const vueApp = createApp({
        mounted() {
          setIsVueHydrated(true);
        }
      });

      vueApp.mount('#vue-content');
    });
  }, []);

  return (
    <div>
      {/* Next.js React Header */}
      <header className="react-header">
        <h1>React Header from Next.js</h1>
      </header>

      {/* Vue.js Content */}
      <main>
        <div
          id="vue-content"
          dangerouslySetInnerHTML={{ __html: vueHTML }}
          className={isVueHydrated ? 'vue-hydrated' : 'vue-ssr'}
        />
      </main>

      {/* Next.js React Footer */}
      <footer className="react-footer">
        <p>React Footer from Next.js</p>
      </footer>
    </div>
  );
}
```

#### **4. Shared State Management (Vue + Next.js)**

**Shared Event Bus:**
```javascript
// shared/eventBus.js
class CrossFrameworkEventBus {
  constructor() {
    this.events = new Map();
    this.setupBroadcastChannel();
  }

  setupBroadcastChannel() {
    if (typeof window !== 'undefined') {
      this.channel = new BroadcastChannel('microfrontend-events');
      this.channel.addEventListener('message', (event) => {
        this.emit(event.data.type, event.data.payload, false);
      });
    }
  }

  emit(event, data, broadcast = true) {
    // Emit locally
    const callbacks = this.events.get(event);
    callbacks?.forEach(callback => callback(data));

    // Broadcast to other windows/frames
    if (broadcast && this.channel) {
      this.channel.postMessage({ type: event, payload: data });
    }
  }

  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(callback);

    return () => {
      this.events.get(event)?.delete(callback);
    };
  }
}

export const eventBus = new CrossFrameworkEventBus();
```

**Vue Composable:**
```javascript
// vue-app/src/composables/useSharedState.js
import { ref, onUnmounted } from 'vue';
import { eventBus } from '../../shared/eventBus';

export function useSharedState(key, initialValue) {
  const state = ref(initialValue);

  const updateState = (newValue) => {
    state.value = newValue;
    eventBus.emit(`state:${key}`, newValue);
  };

  const unsubscribe = eventBus.on(`state:${key}`, (newValue) => {
    state.value = newValue;
  });

  onUnmounted(() => {
    unsubscribe();
  });

  return [state, updateState];
}
```

**Next.js Hook:**
```jsx
// hooks/useSharedState.js
import { useState, useEffect } from 'react';
import { eventBus } from '../shared/eventBus';

export function useSharedState(key, initialValue) {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    const unsubscribe = eventBus.on(`state:${key}`, setState);
    return unsubscribe;
  }, [key]);

  const updateState = (newValue) => {
    setState(newValue);
    eventBus.emit(`state:${key}`, newValue);
  };

  return [state, updateState];
}
```

**Usage Example:**
```jsx
// In Next.js component
function ReactCart() {
  const [cartItems, setCartItems] = useSharedState('cart', []);

  return (
    <div>
      <h2>React Cart: {cartItems.length} items</h2>
      <button onClick={() => setCartItems([...cartItems, 'new-item'])}>
        Add Item from React
      </button>
    </div>
  );
}
```

```vue
<!-- In Vue component -->
<template>
  <div>
    <h2>Vue Cart: {{ cartItems.length }} items</h2>
    <button @click="addItem">Add Item from Vue</button>
  </div>
</template>

<script setup>
import { useSharedState } from '../composables/useSharedState';

const [cartItems, setCartItems] = useSharedState('cart', []);

const addItem = () => {
  setCartItems([...cartItems.value, 'vue-item']);
};
</script>
```

### **Best Practices for Vue + Next.js Integration**

1. **Use Multi-Zones for clean separation** - Route-based separation is cleanest
2. **Shared design system** - Use CSS custom properties or web components
3. **Consistent authentication** - Share JWT tokens via localStorage/cookies
4. **Error boundaries** - Implement error handling in both frameworks
5. **Performance monitoring** - Track both Vue and React components separately
6. **SEO considerations** - Use SSR for both frameworks when needed

This approach allows you to leverage Vue.js strengths while maintaining Next.js as your main shell application.

## 💻 **Recommended Implementation Guide (Modern.js & Rsbuild)**

### **Modern.js + Module Federation Setup (2025)**

#### **Host Application (Modern.js Shell)**
```javascript
// modern.config.js
import { defineConfig } from '@modern-js/app-tools';
import { moduleTools } from '@modern-js/module-tools';

export default defineConfig({
  plugins: [moduleTools()],
  moduleFederation: {
    name: 'shell',
    remotes: {
      'product-catalog': 'productCatalog@http://localhost:3001/mf-manifest.json',
      'shopping-cart': 'shoppingCart@http://localhost:3002/mf-manifest.json',
      'user-profile': 'userProfile@http://localhost:3003/mf-manifest.json',
    },
    shared: {
      react: { singleton: true },
      'react-dom': { singleton: true },
    },
  },
});
```

#### **Rsbuild Configuration Alternative**
```javascript
// rsbuild.config.js
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  plugins: [pluginReact()],
  tools: {
    rspack: {
      plugins: [
        new ModuleFederationPlugin({
          name: 'shell',
          remotes: {
            'product-catalog': 'productCatalog@http://localhost:3001/remoteEntry.js',
            'shopping-cart': 'shoppingCart@http://localhost:3002/remoteEntry.js',
          },
          shared: {
            react: { singleton: true },
            'react-dom': { singleton: true },
          },
        }),
      ],
    },
  },
});
```

#### **Remote Microfrontend (Rsbuild)**
```javascript
// product-catalog/rsbuild.config.js
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  plugins: [pluginReact()],
  tools: {
    rspack: {
      plugins: [
        new ModuleFederationPlugin({
          name: 'productCatalog',
          filename: 'remoteEntry.js',
          exposes: {
            './ProductList': './src/components/ProductList',
            './ProductDetail': './src/components/ProductDetail',
          },
          shared: {
            react: { singleton: true },
            'react-dom': { singleton: true },
          },
        }),
      ],
    },
  },
});
```

#### **Loading Remote Components**
```jsx
// src/pages/ProductsPage.jsx
import React, { Suspense } from 'react';

const ProductList = React.lazy(() => import('product-catalog/ProductList'));

export default function ProductsPage() {
  return (
    <div>
      <h1>Our Products</h1>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductList />
      </Suspense>
    </div>
  );
}
```

### **Advanced Routing Implementation**

#### **Cross-Microfrontend Navigation**
```jsx
// utils/navigation.js
export const navigateToRoute = (path) => {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('microfrontend-navigate', {
      detail: { path }
    });
    window.dispatchEvent(event);
  }
};

// pages/_app.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleMicrofrontendNavigation = (event) => {
      const { path } = event.detail;
      router.push(path);
    };

    window.addEventListener('microfrontend-navigate', handleMicrofrontendNavigation);

    return () => {
      window.removeEventListener('microfrontend-navigate', handleMicrofrontendNavigation);
    };
  }, [router]);

  return <Component {...pageProps} />;
}
```

#### **Dynamic Route-Based Loading**
```jsx
// pages/[...slug].js - Catch-all route
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const routeConfig = {
  'products': () => import('product-catalog/ProductApp'),
  'cart': () => import('shopping-cart/CartApp'),
  'profile': () => import('user-profile/ProfileApp'),
};

export default function DynamicPage() {
  const router = useRouter();
  const { slug } = router.query;
  const basePath = slug?.[0];

  if (!routeConfig[basePath]) {
    return <div>Page not found</div>;
  }

  const DynamicComponent = dynamic(routeConfig[basePath], {
    ssr: false,
    loading: () => <div>Loading...</div>,
  });

  return <DynamicComponent route={slug} />;
}
```

### **State Management Strategies**

#### **Event-Driven Communication**
```jsx
// utils/eventBus.js
class EventBus {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }

  unsubscribe(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}

export const eventBus = new EventBus();
```

#### **Cross-Microfrontend State Hook**
```jsx
// hooks/useCrossMicrofrontendState.js
import { useState, useEffect } from 'react';
import { persistentState } from '../utils/persistentState';

export function useCrossMicrofrontendState(key, initialValue) {
  const [value, setValue] = useState(() =>
    persistentState.get(key) || initialValue
  );

  useEffect(() => {
    const unsubscribe = persistentState.subscribe((event) => {
      if (event.detail.key === key) {
        setValue(event.detail.value);
      }
    });

    return unsubscribe;
  }, [key]);

  const updateValue = (newValue) => {
    setValue(newValue);
    persistentState.set(key, newValue);
  };

  return [value, updateValue];
}
```

### **Performance Optimization Implementation**

#### **Health Check Wrapper**
```jsx
// components/MicrofrontendWrapper.jsx
import { useState, useEffect } from 'react';

export default function MicrofrontendWrapper({
  name,
  fallback = <div>Service unavailable</div>
}) {
  const [isHealthy, setIsHealthy] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const url = getMicrofrontendUrl(name);
        const response = await fetch(`${url}/health`);
        setIsHealthy(response.ok);
      } catch (error) {
        setIsHealthy(false);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);

    return () => clearInterval(interval);
  }, [name]);

  if (!isHealthy) {
    return fallback;
  }

  return <MicrofrontendComponent name={name} />;
}
```

#### **Environment Configuration**
```javascript
// shared/config.js
const environments = {
  development: {
    'product-catalog': 'http://localhost:3001',
    'shopping-cart': 'http://localhost:3002',
    'user-profile': 'http://localhost:3003',
  },
  staging: {
    'product-catalog': 'https://product-catalog-staging.example.com',
    'shopping-cart': 'https://shopping-cart-staging.example.com',
    'user-profile': 'https://user-profile-staging.example.com',
  },
  production: {
    'product-catalog': 'https://product-catalog.example.com',
    'shopping-cart': 'https://shopping-cart.example.com',
    'user-profile': 'https://user-profile.example.com',
  },
};

export const getMicrofrontendUrl = (name) => {
  const env = process.env.NODE_ENV || 'development';
  return environments[env][name];
};
```

## 🚀 **CI/CD & Deployment Strategies**

### **Independent Deployment Pipeline**
```yaml
# .github/workflows/deploy-shell.yml
name: Deploy Shell Application
on:
  push:
    branches: [main]
    paths: ['shell/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy Shell
        run: |
          cd shell
          npm ci
          npm run build
          npm run deploy
```

```yaml
# .github/workflows/deploy-microfrontend.yml
name: Deploy Microfrontend
on:
  push:
    branches: [main]
    paths: ['microfrontends/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        app: [product-catalog, shopping-cart, user-profile]
    steps:
      - uses: actions/checkout@v3
      - name: Deploy ${{ matrix.app }}
        run: |
          cd microfrontends/${{ matrix.app }}
          npm ci
          npm run build
          npm run deploy
```

## 📊 **2025 Success Metrics & Monitoring**

### **Key Performance Indicators**
- **Bundle Size**: <50kB per microfrontend
- **Network Requests**: <4 requests per microfrontend
- **Build Time**: <150ms cold start (with Rspack)
- **First Contentful Paint**: <1.8s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1

### **Monitoring Implementation**
```jsx
// utils/monitoring.js
export const trackMicrofrontendPerformance = (name, metrics) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'microfrontend_performance', {
      microfrontend_name: name,
      load_time: metrics.loadTime,
      bundle_size: metrics.bundleSize,
      error_count: metrics.errorCount,
    });
  }
};

// Error boundary for microfrontends
class MicrofrontendErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Microfrontend error:', error, errorInfo);
    trackMicrofrontendPerformance(this.props.name, {
      errorCount: 1,
      errorMessage: error.message,
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}
```

This research reflects the cutting-edge state of microfrontends in 2025, with Module Federation 2.0 + Rspack emerging as the performance leader, while framework-specific solutions like Next.js still face integration challenges but remain viable with proper tooling.