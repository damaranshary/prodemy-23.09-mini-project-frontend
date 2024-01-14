import { RadioGroup } from "@headlessui/react";
import { Fragment } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const CategoryRadioGroup = ({
  choosenCategory,
  setChoosenCategory,
  categoriesData,
  handleResetCategory,
  label,
}) => {
  return (
    <RadioGroup
      value={choosenCategory}
      onChange={setChoosenCategory}
      className="my-3 flex flex-row items-center gap-x-3 px-1 pb-2"
    >
      {label && (
        <RadioGroup.Label className="text-base font-semibold">
          {label}
        </RadioGroup.Label>
      )}
      <div className="flex flex-row gap-x-3 self-center">
        {categoriesData.map((category) => (
          <RadioGroup.Option key={category.id} as={Fragment} value={category}>
            <div
              className={`flex flex-row items-center justify-between gap-x-2 rounded-full border border-gray-300 px-5 py-2 hover:cursor-pointer ${
                category.id === choosenCategory?.id
                  ? "bg-primary text-white"
                  : ""
              }`}
            >
              <p className="text-sm font-semibold">{category.name}</p>
              {category.id === choosenCategory?.id && (
                <button onClick={handleResetCategory}>
                  <AiOutlineCloseCircle />
                </button>
              )}
            </div>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default CategoryRadioGroup;
