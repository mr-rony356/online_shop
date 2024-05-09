import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Hi there</h1>
      <Link href="/admin">Go to admin</Link>
    </main>
  );
}
