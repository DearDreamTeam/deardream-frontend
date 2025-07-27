import { AddInstitutionProps } from "@/types/admin-dto";
import { formatPhoneNumber } from "@/utils/format-phone-number";
import { Dispatch, SetStateAction } from "react";
import { ADD_INSTITUTIONS_TABLE_ITEMS } from "./table-items";
import PostcodePopup from "@/components/address/postcode-popup";
import Cancel from "@/public/icons/common/cancel.svg";

export const AddInstitutionTableItem = ({
  index,
  addressDetail,
  name,
  postalCode,
  address,
  phone,
  serviceDate,
  members,
  setInstitutionList,
  handleDeleteAdd,
}: AddInstitutionProps & {
  index: number;
  setInstitutionList: Dispatch<SetStateAction<AddInstitutionProps[]>>;
  handleDeleteAdd: (index: number) => void;
}) => {
  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    const value =
      name === "phone" ? formatPhoneNumber(e.target.value) : e.target.value;
    setInstitutionList((prev) =>
      prev.map((item, idx) =>
        idx === index
          ? {
              ...item,
              [name]: value,
            }
          : item,
      ),
    );
  };

  const handleAddress = (postalCode: string, address: string) => {
    setInstitutionList((prev) =>
      prev.map((item, idx) =>
        idx === index
          ? {
              ...item,
              postalCode,
              address,
            }
          : item,
      ),
    );
  };

  return (
    <div className="admin-table-item items-center gap-4">
      <span className={ADD_INSTITUTIONS_TABLE_ITEMS[0].flex}>{index}</span>

      <span className={ADD_INSTITUTIONS_TABLE_ITEMS[1].flex}>
        <input
          value={name}
          name={ADD_INSTITUTIONS_TABLE_ITEMS[1].value}
          onChange={handleChangeInput}
          type="text"
          placeholder="기관명"
          className="input-center"
          required
        />
      </span>
      <span className={ADD_INSTITUTIONS_TABLE_ITEMS[2].flex}>
        <input
          value={postalCode}
          placeholder="우편번호"
          name={ADD_INSTITUTIONS_TABLE_ITEMS[2].value}
          type="text"
          onChange={() => {}}
          required
          className="input-center"
        />
        <PostcodePopup handleAddress={handleAddress} />
      </span>

      <span className={ADD_INSTITUTIONS_TABLE_ITEMS[3].flex}>
        <div className={`break-keep ${!address && "text-grey-400"}`}>
          {address || "기관주소는 자동 입력됩니다"}
        </div>
      </span>

      <span className={ADD_INSTITUTIONS_TABLE_ITEMS[4].flex}>
        <input
          value={addressDetail}
          name={ADD_INSTITUTIONS_TABLE_ITEMS[4].value}
          onChange={handleChangeInput}
          type="text"
          placeholder="층 or 호"
          className="input-center"
        />
      </span>

      <span className={ADD_INSTITUTIONS_TABLE_ITEMS[5].flex}>
        <input
          value={phone}
          name={ADD_INSTITUTIONS_TABLE_ITEMS[5].value}
          onChange={handleChangeInput}
          type="tel"
          pattern="([0-9]{3}-[0-9]{3}-[0-9]{4})|([0-9]{2}-[0-9]{3}-[0-9]{4})|([0-9]{3}-[0-9]{4}-[0-9]{4})"
          placeholder="000-0000-0000"
          className="input-center"
          required
        />
      </span>

      <span className={ADD_INSTITUTIONS_TABLE_ITEMS[6].flex}>
        <input
          value={serviceDate}
          name={ADD_INSTITUTIONS_TABLE_ITEMS[6].value}
          onChange={handleChangeInput}
          type="month"
          className="input-center w-32"
          required
        />
      </span>

      <span className={ADD_INSTITUTIONS_TABLE_ITEMS[7].flex}>
        <input
          value={members}
          name={ADD_INSTITUTIONS_TABLE_ITEMS[7].value}
          onChange={handleChangeInput}
          type="number"
          step="10"
          min={0}
          placeholder="000"
          className="input-center w-16"
          required
        />
      </span>

      <span className={ADD_INSTITUTIONS_TABLE_ITEMS[8].flex}>
        <button
          type="button"
          className="bg-grey-200 text-grey-0 w-fit rounded-full"
          onClick={() => handleDeleteAdd(index)}
        >
          <Cancel />
        </button>
      </span>
    </div>
  );
};
