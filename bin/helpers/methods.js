module.exports = (methods) => methods.map((method) => {
  const [name, type] = method.split(':');

  return {
    name,
    type: type || 'string',
  };
});
