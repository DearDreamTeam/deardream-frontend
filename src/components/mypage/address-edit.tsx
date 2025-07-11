interface AddressEditProps {
  planType: string;
}

const AddressEdit = ({ planType }: AddressEditProps) => {
  return (
    <div className="text-grey-500 flex w-full flex-col gap-10">
      <div className="flex w-full flex-col gap-2">
        주소
        <input
          type="text"
          placeholder="기관 건물, 지번 또는 도로명 검색"
          className="border-grey-200 text-title-3 text-grey-700 focus:none w-full border-b py-2 focus:outline-none"
        />
        <input
          type="text"
          placeholder="상세 주소를 입력해주세요"
          className="border-grey-200 text-title-3 text-grey-700 focus:none w-full border-b py-2 focus:outline-none"
        />
      </div>
      {planType === "INSTITUTION" && (
        <>
          <div>
            기관 주소
            <input
              type="text"
              placeholder="기관 주소를 입력해주세요"
              className="border-grey-200 text-title-3 text-grey-700 focus:none w-full border-b py-2 focus:outline-none"
            />
          </div>
        </>
      )}
      <div>
        받는 분
        <input
          type="text"
          placeholder="받는 분의 이름을 입력해주세요"
          className="border-grey-200 text-title-3 text-grey-700 focus:none w-full border-b py-2 focus:outline-none"
        />
      </div>
      <div>
        연락처
        <input
          type="text"
          placeholder="연락처를 입력해주세요"
          className="border-grey-200 text-title-3 text-grey-700 focus:none w-full border-b py-2 focus:outline-none"
        />
      </div>
    </div>
  );
};
export default AddressEdit;
