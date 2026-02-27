"use client"

interface QRCodeProps {
  address: string
  size?: number
}

export function QRCode({ address, size = 200 }: QRCodeProps) {
  // Using QR code API for simplicity
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(address)}`

  return (
    <div className="flex justify-center">
      <div className="p-4 bg-white rounded-lg">
        <img src={qrCodeUrl || "/placeholder.svg"} alt="QR Code" width={size} height={size} className="w-full h-auto" />
      </div>
    </div>
  )
}
