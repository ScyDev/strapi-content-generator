# Strapi plugin content-generate

![](https://github.com/ScyDev/strapi-plugin-content-generate/workflows/Run-Tests/badge.svg)

## First Setup
```bash
cd /<path-to-your-strapi-project

# create plugins folder if not exists
# mkdir plugins

# go to plugins folder
cd plugins

# clone the plugin code into a folder and skip the prefix
git clone git@github.com:ScyDev/strapi-plugin-content-generate.git content-generate
# install dependencies
cd content-generate && yarn install
# build the plugin
cd ../..
yarn build

# start
yarn develop
```

## Plugin development
```bash
yarn develop --watch-admin
```
Running at http://localhost:8000/

## Features

- Generating content from JSON template
- Delete all content of a type

**Not supported**

- Media fields, e.g. image, video, etc.
- Any other file type, e.g. csv, etc.

## Shout outs

- based on the content-import-export plugin by Lazurey: https://github.com/lazurey/strapi-plugin-content-export-import

## References

- [Component List - Strapi Helper Plugin](https://github.com/strapi/strapi/tree/master/packages/strapi-helper-plugin/lib/src/components)
- [Strapi Content Import Plugin](https://github.com/strapi/community-content/tree/master/tutorials/code/import-content-plugin-tutorial/plugins/import-content)
- [Guide to Strapi Content Import Plugin](https://strapi.io/blog/how-to-create-an-import-content-plugin-part-1-4?redirectPage=3)
- [Strapi Styled Component](https://buffetjs.io/storybook/?path=/story/components--button)
