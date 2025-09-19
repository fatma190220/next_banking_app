import { Fullscreen } from "lucide-react";
import  Image  from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <main className="flex min-h-screen w-full">
  {/* الجزء الخاص بالفورم (الشمال) */}
  <div className="w-full lg:w-3/5 flex items-center justify-center p-6">
    {children}
  </div>

  {/* الجزء الخاص بالصورة (اليمين - تظهر بس في الشاشات الكبيرة) */}
  <div className="hidden lg:flex w-2/5 items-center justify-center bg-gray-50">
    <div className="relative h-full w-full" />
  </div>
</main>


  );
}
