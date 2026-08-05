import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        dr_b: resolve(__dirname, 'dr-b.html'),
        dr_deji: resolve(__dirname, 'dr-deji.html'),
        your_health: resolve(__dirname, 'your-health.html'),
        patient_policies: resolve(__dirname, 'patient-policies.html'),
      },
    },
  },
})
