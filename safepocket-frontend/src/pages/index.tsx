import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>SafePocket</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">SafePocket</h1>
        <p className="mt-4 text-lg">Seu gerenciador de finanças pessoais.</p>
        <div className="mt-8">
          <Link href="/login">
            <a className="px-4 py-2 bg-blue-500 text-white rounded">Login</a>
          </Link>
          <Link href="/register">
            <a className="ml-4 px-4 py-2 bg-green-500 text-white rounded">Register</a>
          </Link>
        </div>
      </main>
    </div>
  );
}
