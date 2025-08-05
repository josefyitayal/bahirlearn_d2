import Link from "next/link"

import { Button} from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-between w-full px-8 py-3">
        <Link href="/">BahirLearn</Link>

        <div className="flex items-center gap-5">
          <Button variant="secondary">
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button>
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
