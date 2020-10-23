import React, {memo, useState, useEffect} from 'react';
// import PropTypes from 'prop-types';
import {PluginHeader,} from "strapi-helper-plugin";

import pluginId from '../../pluginId';
import Nav from "../../components/Nav";
import {MainDiv} from "../GeneratePage/ui-components";
import GenerateForm from "./GenerateForm";
import {getModels} from "../../utils/contentApis";

const GeneratePage = () => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    async function loadContentTypes() {
      const models = await getModels();
      setModels(models);
    }
    loadContentTypes();
  }, []);
  return (
    <div className="container-fluid" style={{padding: "18px 30px"}}>
      <PluginHeader
        title="Generate Content"
        description={pluginId + " / Generate data from JSON"}
      />
      <Nav/>
      <MainDiv>
        <h2>Generate content</h2>
        <GenerateForm models={models}/>
      </MainDiv>
    </div>
  );
};

export default memo(GeneratePage);
