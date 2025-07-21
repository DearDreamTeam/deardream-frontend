import React from "react";
import {
  ADD_INSTITUTIONS_TABLE_ITEMS,
  INDIVIDUALS_TABLE_ITEMS,
  INSTITUTION_FAMILY_TABLE_ITEMS,
  INSTITUTIONS_TABLE_ITEMS,
} from "./table-items";

export const IndividualTableHeader = () => {
  return (
    <div className="admin-table-header gap-4">
      {INDIVIDUALS_TABLE_ITEMS.map(({ label, flex }, index) => (
        <span key={`inv-th-${index}`} className={flex}>
          {label}
        </span>
      ))}
    </div>
  );
};

export const InstitutionTableHeader = () => {
  return (
    <div className="admin-table-header gap-2">
      {INSTITUTIONS_TABLE_ITEMS.map(({ label, flex }, index) => (
        <span key={`inst-th-${index}`} className={flex}>
          {label}
        </span>
      ))}
    </div>
  );
};

export const AddInstitutionTableHeader = () => {
  return (
    <div className="admin-table-header gap-4 break-keep">
      {ADD_INSTITUTIONS_TABLE_ITEMS.map(({ label, flex }, index) => (
        <span key={`inst-th-${index}`} className={flex}>
          {label}
        </span>
      ))}
    </div>
  );
};

export const InstitutionFamilyTableHeader = () => {
  return (
    <div className="admin-table-header gap-4 break-keep">
      {INSTITUTION_FAMILY_TABLE_ITEMS.map(({ label, flex }, index) => (
        <span key={`inst-f-th-${index}`} className={flex}>
          {label}
        </span>
      ))}
    </div>
  );
};
