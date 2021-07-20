# Change Log

## v1.1.4
- customizeFilter 逻辑前置：生成文件时 前置到 处理文件数据前

## v1.1.0
### Added
- 使用 隐藏 账号密码 登录 不需要配置token uid
- index.js、update.json 入口文件去除，解决Git代码冲突
- 命令运行前 先获取git 暂存区文件，保证git暂存区为空再开始运行
- 增加TAG 模式，使用tag与使用时git分支号对应关系 找到迭代版本里需要更新的接口文件，解决分支号冲突问题

### Deleted
- updateMode 使用 customizeFilter 自定义
- catid 使用 customizeFilter 自定义

## v1.0.14
### Added
- 增加 updateMode: ('ADD' | 'DELETE' | 'CHANGE')[]

## v1.0.12 & v1.0.13
### Added
- 加入代码自动美化流程
- 处理windows平台上 空格比对

## v1.0.11
### Added
- 增加 yapiBaseInfo 用于获取基础数据源处理代码片段

## v1.0.10
### Added
- 过滤catid流程前置

## v1.0.7
### Changed
- 支持多项目接口生成支持

## v1.0.6
### Changed
- 增加是否开启changelog选项, 不填则不开启

## v1.0.5
### Changed
- get方法 入参interface 类型为string | number

## v1.0.4
### Added
- 查看版本号 `yfeapi2ts version`



## v1.0.3
### Added
- 增加 catid exclude、include 参数
- 文件名生成方式可自定义
```
generateApiName: (path, _id) => {
  return `Id${_id}`
}
```

