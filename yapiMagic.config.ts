// import { ServerConfig } from 'ywapi2ts'
import _ from 'lodash'

const generateApiFileCode = (api) => {
  // console.log(JSON.stringify(api.yapiBaseInfo, null, 2))
  const isParamsUrl = api.path.indexOf('{') > -1
  const arr = [
    `
    /**
    * ${api.title}
    * ${api.markdown || ''}
    **/
      `,
    'import request from \'@/utils/request\'',
    api.requestInterface,
    api.responseInterface
  ]
  if (isParamsUrl) {
    // 带params 格式参数
    const reg = /\{.*?\}/g
    const paramsKeys = api.path.match(reg).map((ele) => ele.replace('{', '').replace('}', ''))
    const paramsKeysStr = paramsKeys.reduce((prev, value) => {
      prev += `${value}: any, `
      return prev
    }, '')
    arr.push(
      // 'type Serve<T, G> = (data?: T) => Promise<G>',
      `export default (${paramsKeysStr} data?: ${api.reqInterfaceName}): Promise<${
        api.resInterfaceName
      }> => request({
        method: '${api.method}',
        url: '${api.path.replace(/\{/, `'+`).replace(/\}/, '')},
        ${(() => {
        if (api.method.toLocaleLowerCase() === 'get') {
          return 'params: data'
        }
        return 'data: data'
      })()}
      })`
    )
  } else {
    arr.push(
      'type Serve<T, G> = (data?: T) => Promise<G>',
      `const http: Serve<${api.reqInterfaceName}, ${
        api.resInterfaceName
      }['data'] > = (data?) =>  request({
        method: '${api.method}',
        url: '${api.path}',
        ${(() => {
        if (api.method.toLocaleLowerCase() === 'get') {
          return 'params: data'
        }
        return 'data: data'
      })()}
      }) `,
      `export default http`
    )
  }

  return arr.join(`
  `)
}
const config = [
  {
    target: 'ts',
    serverUrl: 'http://yapi.smart-xwork.cn',
    outputFilePath: 'api',
    projectId: '145124',
    generateApiName: (path, _id, method) => {
      return _.camelCase(path) + _.upperFirst(method.toLocaleLowerCase())
    },
    notCheckGit: true,
    generateApiFileCode,
    // 不生成 updateJson
    generateUpdateJson: false,
    // 不生成 index文件
    generateIndexFile: false,
    customizeFilter: (api, { currentGitBranch }) => {
      // 采用 git 分支号做多版本并行的标识
      // const { tag } = api.yapiBaseInfo
      // if (tag.includes(currentGitBranch)) {
      //   console.log(api.id)
      // }
      // return tag.includes(currentGitBranch)
      return true
    }
  }
]

// export default config
module.exports = config
