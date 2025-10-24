import { Card3D } from "@/components/3d-card"

export default function TestCard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card3D
        className="w-64 h-64 bg-blue-500 rounded-xl"
        profilePhoto="/images/Profile.png"
      >
        <div className="p-4 text-white">
          <h2 className="text-xl font-bold">Test Card</h2>
          <p>This is a test of the Card3D component with profile photo.</p>
        </div>
      </Card3D>
    </div>
  )
}
