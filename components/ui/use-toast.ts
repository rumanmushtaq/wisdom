'use client'

import { toast as sonnerToast } from 'sonner'
import * as React from 'react'

type ToastProps = {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

function toast({ title, description, action }: ToastProps) {
  return sonnerToast(title as string, {
    description,
    action,
  })
}

function useToast() {
  return {
    toast,
    dismiss: (id?: string | number) => {
      if (id) {
        sonnerToast.dismiss(id)
      } else {
        sonnerToast.dismiss()
      }
    },
  }
}

export { useToast, toast }