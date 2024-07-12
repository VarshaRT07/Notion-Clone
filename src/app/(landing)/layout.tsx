import Header from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full dark:bg-[#000000]">
      <Header />
      <main className="h-full pt-24">{children}</main>
    </div>
  );
}
