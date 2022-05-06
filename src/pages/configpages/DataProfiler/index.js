import React, { Component } from "react";
import DataProfiler from "./DataProfiler";
export const DataContext = React.createContext();

export default class DataProvider extends Component {
  constructor() {
    super();
    this.state = {
      setSelectedData: this.setSelectedData,
      setSelectedProfile: this.setSelectedProfile,
      profileCollapseId: null,
      selectedProfile: null,
      theme: {
        color1: "#696969",
        color2: "#7D7D7D",
        color3: "#F0F0F0",
        color4: "#FFFFFF", //white - menu Background color
        color5: "#BDBDBD", //grey  - menu Border color
        //color5: "#F0F0F0",
        color6: "#111111", //black - font color
        color10: "#FFFFFF",
        color11: "#0E4B71", //bluish    - Page Title
        color12: "#FFFFFF",
        font: "Roboto",
        size: "1rem",
      },
    };
  }

  setSelectedData = (id, catalogs) => {
    const catalogData = catalogs ? catalogs : this.state.catalogData;
    let selectedCatalog = catalogData.filter(
      (catalog) => catalog.sourceId == id
    );
    this.setState({
      selectedSourceId: selectedCatalog[0].sourceId,
      selectedSource: selectedCatalog[0].sourceName,
      selectedDesc: selectedCatalog[0].description,
      selectedTags: selectedCatalog[0].tags,
      selectedFileArray: selectedCatalog[0].fileArray,
    });
  };

  setSelectedProfile = (sourceId, fileId, catalogs, profiles) => {
    const catalogData = catalogs ? catalogs : this.state.catalogData;
    const allProfiles = profiles ? profiles : this.state.allProfiles;

    let chosenCatalog = catalogData.filter(
      (catalog) => catalog.sourceId == sourceId
    );
    let chosenFile = chosenCatalog[0].fileArray.filter(
      (file) => file.id === fileId
    )[0].name;

    let selectedProfile = allProfiles.filter(
      (pro) => pro.file === chosenFile
    )[0].profile;
    if (this.state.profileCollapseId !== sourceId) {
      this.setState((prevState) => ({
        profileCollapseId:
          prevState.profileCollapseId !== sourceId ? sourceId : "",
        selectedProfile,
      }));
    } else if (this.state.selectedProfile !== selectedProfile) {
      this.setState({ selectedProfile });
    } else if (
      this.state.profileCollapseId === sourceId &&
      this.state.selectedProfile === selectedProfile
    ) {
      this.setState({ profileCollapseId: "" });
    }
  };

  render() {
    return (
      <DataContext.Provider value={this.state}>
        <DataProfiler />
      </DataContext.Provider>
    );
  }
}
