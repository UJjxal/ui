
import React from 'react';

const FilterTags = (props) => {

    var filteredList = Object.values(props.filter).filter(item => item.length > 0)
    var filterDateRange = props.filterDateRange.filter(item => item.length)

    if (filterDateRange.length > 1) {
        filteredList.push([`${filterDateRange[0]}~${filterDateRange[1]}`])
    }
    if (props.isTodayDate) {
        filteredList.push(["Today"])
    }
    if (props.isYesterdayDate) {
        filteredList.push(["Yesterday"])
    }

    if (filteredList.length > 0) {
        filteredList.push(["Clear All"])
    }

    const filterTag = filteredList.map(item => {

        return (
            item.map((tag, index) => {
                return (
                    <li key={index} className="mr-1 tag ">
                        {tag} <i onClick={() => props.handleTagClick(tag)} style={{ color: 'grey' }} className="fa fa-times ml-1" aria-hidden="true"></i>
                    </li>
                )
            })
        )
    })

    return (
        <div className="tag-container">
            <ul className="tag-wrapper pl-0 mb-0">
                {filterTag}
            </ul>
        </div>
    )
}

export default FilterTags;