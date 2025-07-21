import { TableItemsType } from "./table-items";

type TableHeaderProps = {
  items: TableItemsType;
  keyPrefix: string; // key prefix 중복 방지용
  gap?: string; // optional로, 기본값 줄 수도 있음
  className?: string;
};

export const TableHeader = ({
  items,
  gap = "gap-4",
  keyPrefix,
  className = "",
}: TableHeaderProps) => {
  return (
    <div className={`admin-table-header ${gap} ${className}`}>
      {items.map(({ label, flex }, index) => (
        <span key={`${keyPrefix}-th-${index}`} className={flex}>
          {label}
        </span>
      ))}
    </div>
  );
};
