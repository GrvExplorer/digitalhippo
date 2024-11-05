import { cn } from "@/utils/utils";
import { useState } from "react";

function LabelledIcon({
  icon,
  label,
  className,
  setLabelIconActive,
  labelIconActive,
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
  setLabelIconActive: React.Dispatch<React.SetStateAction<string>>;
  labelIconActive: string;
}) {


  return (
    <div
      onClick={() => {
        setLabelIconActive(label);
      }}
      className={cn(
        `flex items-center gap-2 text-slate-600 cursor-pointer transition rounded-lg px w-full`,
        className,
        { "bg-gray-200 text-purple-800": labelIconActive === label },
        {
          'hover:text-slate-800 hover:bg-gray-100': labelIconActive !== label
        }
      )}
    >
      {icon}
      <p className="capitalize">{label}</p>
    </div>
  );
}

export default LabelledIcon;
