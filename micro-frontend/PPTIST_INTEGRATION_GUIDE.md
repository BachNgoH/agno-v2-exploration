# 🎯 PPTist Vue.js + Next.js Microfrontend Integration

This demonstrates a **complete microfrontend integration** between PPTist (Vue.js) and Next.js using **Web Components** with real-time **state sharing** for title and slides data.

## 🚀 **Features**

✅ **Vue.js to Web Component**: PPTist converted to a reusable Web Component
✅ **Real-time State Sync**: Title and slides JSON shared bidirectionally
✅ **Next.js App Router**: Modern Next.js 15 integration
✅ **TypeScript Support**: Full type safety across frameworks
✅ **Import/Export**: JSON data management between frameworks
✅ **Demo Controls**: Live demonstration of state synchronization

## 📦 **Architecture**

```
micro-frontend/
├── PPTist/                          # Vue.js Web Component
│   ├── src/
│   │   ├── main-webcomponent.ts     # Web Component entry
│   │   ├── PPTistWebComponent.ce.vue # Web Component wrapper
│   │   └── store/slides.ts          # Pinia store (title + slides)
│   ├── vite.webcomponent.config.ts  # Web Component build config
│   └── package.json                 # Added build-webcomponent script
│
└── frontend/                        # Next.js Shell
    ├── src/
    │   ├── app/pptist/page.tsx      # PPTist integration page
    │   └── components/
    │       └── PPTistIntegration.tsx # Main integration component
    └── package.json
```

## 🛠️ **Setup Instructions**

### **1. Setup PPTist (Vue.js Web Component)**

```bash
# Navigate to PPTist
cd PPTist

# Install dependencies
npm install

# Build Web Component
npm run build-webcomponent

# Start development server (serves Web Component)
npm run dev
```

**PPTist will run on**: `http://localhost:5173`

### **2. Setup Next.js Frontend**

```bash
# Navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Start Next.js development server
npm run dev
```

**Next.js will run on**: `http://localhost:3000`

### **3. Access the Integration**

Navigate to: **http://localhost:3000/pptist**

## 🔄 **State Sharing Demo**

The integration demonstrates **bidirectional state sharing**:

### **Vue → Next.js**
- Edit presentation title in PPTist
- Add/remove slides in PPTist
- Changes instantly appear in Next.js control panel

### **Next.js → Vue**
- Update title from Next.js controls
- Load sample data from Next.js
- Reset presentation from Next.js
- Changes instantly reflect in PPTist editor

### **Shared State Structure**
```typescript
interface PPTistState {
  title: string;        // Presentation title
  slides: Slide[];      // Array of slide objects
  slideCount: number;   // Total number of slides
  currentSlide: number; // Current slide index
}
```

## 🎯 **Integration Methods Used**

### **1. Web Components (Primary)**
- Custom element: `<pptist-editor>`
- Props: `initial-title`, `initial-slides`
- Events: `pptist-state-change`

### **2. PostMessage API (Fallback)**
- Cross-frame communication
- Type: `PPTIST_STATE_CHANGE`
- Bidirectional state updates

### **3. Custom Events**
- DOM events for local communication
- Event bubbling for parent listeners

## 📋 **Demo Features**

1. **Real-time State Display**: See current title, slide count, and JSON preview
2. **Title Control**: Update presentation title from Next.js
3. **Sample Data**: Load predefined slides from Next.js
4. **Reset Function**: Clear and reset presentation
5. **Import/Export**: Save and load presentation data as JSON
6. **Debug Panel**: Raw state inspection for development

## 🧪 **Testing the Integration**

### **Test State Sync:**
1. Open the integration at `/pptist`
2. Change title in PPTist → See update in Next.js panel
3. Click "Load Sample Data" in Next.js → See changes in PPTist
4. Add slides in PPTist → Watch slide count update in Next.js

### **Test Import/Export:**
1. Make changes in PPTist
2. Click "Export JSON" in Next.js
3. Modify the downloaded JSON
4. Click "Import JSON" → See changes apply to PPTist

## 🎨 **UI Components**

The integration uses **Shadcn/ui** components for a polished interface:
- `Card`, `CardHeader`, `CardContent` - Layout structure
- `Button` - Interactive controls
- `Input` - Title editing
- `Badge` - Status indicators
- `Separator` - Visual dividers

## 🔧 **Technical Implementation**

### **Web Component Definition**
```typescript
// PPTist/src/main-webcomponent.ts
const PPTistElement = defineCustomElement(PPTistWebComponent)
customElements.define('pptist-editor', PPTistElement)
```

### **State Management**
```vue
<!-- PPTist/src/PPTistWebComponent.ce.vue -->
<script setup>
import { useSlidesStore } from '@/store/slides'

const slidesStore = useSlidesStore()

// Watch for state changes
watch(
  () => [slidesStore.title, slidesStore.slides],
  () => sendStateToParent(),
  { deep: true }
)
</script>
```

### **Next.js Integration**
```tsx
// frontend/src/components/PPTistIntegration.tsx
useEffect(() => {
  const handleStateChange = (event: CustomEvent) => {
    const state = event.detail as PPTistState;
    setPptistState(state);
  };

  document.addEventListener('pptist-state-change', handleStateChange);
}, []);
```

## 🚨 **Troubleshooting**

### **PPTist Not Loading**
- Ensure PPTist dev server is running on port 5173
- Check browser console for CORS errors
- Verify Web Component build completed successfully

### **State Not Syncing**
- Check browser console for JavaScript errors
- Verify event listeners are properly attached
- Ensure both servers are running

### **Build Issues**
```bash
# Clean and rebuild PPTist Web Component
cd PPTist
rm -rf dist-webcomponent
npm run build-webcomponent

# Restart dev server
npm run dev
```

## 📈 **Performance Considerations**

- **Lazy Loading**: Web Component loads asynchronously
- **Event Throttling**: State updates are optimized
- **Memory Management**: Event listeners properly cleaned up
- **Bundle Splitting**: Separate Vue and React bundles

## 🎉 **Success Criteria**

✅ PPTist runs as Web Component
✅ Next.js successfully embeds PPTist
✅ Title synchronizes bidirectionally
✅ Slides data synchronizes in real-time
✅ Import/Export functionality works
✅ No console errors during operation
✅ Responsive design on different screen sizes

This integration showcases the power of **Web Components** for cross-framework microfrontend architectures, providing a clean separation while enabling powerful state sharing capabilities!