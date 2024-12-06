import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <Button variant="secondary" onClick={() => setCount(count + 1)}>Increment</Button>
    </div>
  );
}
