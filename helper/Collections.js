export const validateCollectionName = (name, list) => {
  if (name.length == 0) {
    return false;
  }
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const containsSpecialChar = specialChars.test(name);
  if (containsSpecialChar) {
    return false;
  }

  const temp = [...list, { title: name }];
  const unique = [...new Set(temp.map((value) => value.title))];
  if (unique.length !== temp.length) {
    return false;
  }
  return true;
};
