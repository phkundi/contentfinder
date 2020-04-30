import React from "react";
import {
  ContentListDropDown,
  ContentListFilterButton,
  ContentListDropdownMenu,
  ContentListDropDownItem,
} from "../styles/ContentListStyles";

function SortContentActions({
  showDropDown,
  toggleShowDropDown,
  sortBy,
  handleSortClick,
}) {
  return (
    <ContentListDropDown>
      <ContentListFilterButton
        showDropDown={showDropDown}
        onClick={toggleShowDropDown}
      >
        Sort: {sortBy} <i className="fas fa-caret-down" />
      </ContentListFilterButton>
      <ContentListDropdownMenu showDropDown={showDropDown}>
        <ContentListDropDownItem onClick={handleSortClick}>
          Newest
        </ContentListDropDownItem>
        <ContentListDropDownItem onClick={handleSortClick}>
          Most Popular
        </ContentListDropDownItem>
      </ContentListDropdownMenu>
    </ContentListDropDown>
  );
}

export default SortContentActions;
