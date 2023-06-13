import React, { useState } from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

export default function Pagination({ name }) {
  const [active, setActive] = useState(1);
  const router = useRouter();
  console.log(router);

  const next = () => {
    if (active === 10) return;

    router.push({ query: { name, pageID: (active + 1) * 10 } });
    setActive(active + 1);
    // router.replace(router.asPath);
  };

  const prev = () => {
    if (active - 1 > 0) {
      router.push({ query: { name, pageID: (active - 1) * 10 } });
      setActive(active - 1);
    } else {
      router.push({ query: { name, pageID: 1 } });
      if (active === 1) return;
    }
  };

  return (
    <div className="flex items-center gap-8">
      <IconButton
        size="sm"
        variant="outlined"
        color="blue-gray"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography color="gray" className="font-normal">
        Page <strong className="text-blue-gray-900">{active}</strong> of{" "}
        <strong className="text-blue-gray-900">10</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        color="blue-gray"
        onClick={next}
        disabled={active === 10}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
