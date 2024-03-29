import { ChangeEvent, Dispatch, SetStateAction, useMemo } from "react";
import { Checkbox, RadioButton } from "..";
import { Filter } from "@/app/page";

type Props = {
  filterOn: {
    colour: string | null;
    tags?: string;
  }[];
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
  setSort: Dispatch<SetStateAction<"Asc" | "Dsc">>;
};

export function FilterOptions({ filterOn, filter, setFilter, setSort }: Props) {
  const filterOptions = useMemo(() => {
    const filteredTags = filterOn
      .map((todo) => todo.tags)
      .filter((tag): tag is string => tag !== null && tag !== undefined);
    const filteredColours = filterOn.map((todo) => todo.colour);

    return {
      colours: [...new Set(filteredColours)],
      tags: [...new Set(filteredTags)],
    } as {
      colours: string[];
      tags: string[];
    };
  }, [filterOn]);

  const setColourFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const currentFilter: Filter = { ...filter };

    currentFilter.colours = currentFilter.colours?.includes(value)
      ? currentFilter.colours.filter((x) => x !== value)
      : [...(currentFilter.colours || []), value];

    setFilter(currentFilter);
  };

  const setTagsFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const currentFilter: Filter = { ...filter };

    currentFilter.tags = currentFilter.tags?.includes(value)
      ? currentFilter.tags.filter((x) => x !== value)
      : [...(currentFilter.tags || []), value];

    setFilter(currentFilter);
  };

  const setShowClosed = () => {
    const currentFilter: Filter = { ...filter };

    currentFilter.showClosed = !currentFilter.showClosed;

    setFilter(currentFilter);
  };

  if (!filterOptions) {
    return <>Loading...</>;
  } else
    return (
      <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2">
        <div className="flex flex-col border border-black rounded-xl p-2 space-y-2 w-1/2 md:w-fit">
          <h2 className="text-lg">Filter</h2>
          <h3 className="underline underline-offset-4">System</h3>

          <Checkbox onChange={setShowClosed}>Closed</Checkbox>

          <h3 className="underline underline-offset-4">Tags</h3>
          {filterOptions.tags !== undefined && filterOptions.tags.length !== 0
            ? filterOptions.tags.map((tag) => (
                <Checkbox
                  key={tag}
                  value={tag}
                  onChange={(e) => setTagsFilter(e)}
                >
                  {tag}
                </Checkbox>
              ))
            : "No colours available"}
          <h3 className="underline underline-offset-4">Colours</h3>
          {filterOptions.colours !== undefined &&
          filterOptions.colours.length !== 0
            ? filterOptions.colours.map((colour) => (
                <Checkbox
                  key={colour}
                  value={colour}
                  onChange={(e) => setColourFilter(e)}
                >
                  {colour}
                </Checkbox>
              ))
            : "No colours available"}
        </div>
        <div className="flex flex-col border border-black rounded-xl p-2 space-y-2 w-1/2 md:w-fit">
          <h2 className="text-lg">Sort</h2>
          <RadioButton name="sort" onClick={() => setSort("Asc")}>
            Ascending
          </RadioButton>
          <RadioButton
            name="sort"
            defaultChecked={true}
            onClick={() => setSort("Dsc")}
          >
            Descending
          </RadioButton>
        </div>
      </div>
    );
}
