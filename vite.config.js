import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        dr_b: resolve(__dirname, 'dr-b.html'),
        dr_bayo: resolve(__dirname, 'dr-bayo.html'),
        dr_jane: resolve(__dirname, 'dr-jane.html'),
        your_health: resolve(__dirname, 'your-health.html'),
        your_health_editor: resolve(__dirname, 'your-health-editor.html'),
        patient_policies: resolve(__dirname, 'patient-policies.html'),
        patient_policies_editor: resolve(__dirname, 'patient-policies-editor.html'),
        register: resolve(__dirname, 'register.html'),
      },
    },
  },
})
