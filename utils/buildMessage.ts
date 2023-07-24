const buildMessage = (entity: string, action: string): string => {
  if (action === 'list') {
    return `${entity}s ${action}ed`
  }
  return `${entity} ${action}d`
}

export default buildMessage
