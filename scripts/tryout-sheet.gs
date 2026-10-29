
const SHEET_NAME = 'מיונים';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const data = JSON.parse(e.postData.contents);
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
      return json({ ok: false, error: 'invalid email' });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const headers = sheet
      .getRange(1, 1, 1, sheet.getLastColumn())
      .getValues()[0]
      .map((h) => String(h).trim().replace(/\?$/, ''));
    const col = (name) => headers.indexOf(name) + 1;

    const emailCol = col('email');
    const lastRow = Math.max(sheet.getLastRow(), 1);
    const emails = sheet.getRange(1, emailCol, lastRow, 1).getValues().map((r) => String(r[0]).trim());

    if (emails.includes(data.email)) return json({ ok: true, duplicate: true });

    let row = emails.findIndex((v, i) => i > 0 && v === '') + 1;
    if (row === 0) row = lastRow + 1;

    const [firstName, ...rest] = String(data.fullName || '').trim().split(/\s+/);
    const values = {
      role: 'Applicant',
      email: data.email,
      first_name: firstName || '',
      last_name: rest.join(' '),
      test_day: data.preferredDate,
      school_year: data.schoolYear,
      experience: data.experience,
      field_of_study: data.fieldOfStudy,
      experience_details: data.experienceDetails,
      // Leading apostrophe stores it as text so Sheets keeps the leading 0.
      phone_number: data.phoneNumber ? `'${data.phoneNumber}` : '',
    };

    // Write the whole row in one call so a rejected cell never leaves a half-filled row.
    const range = sheet.getRange(row, 1, 1, headers.length);
    const rowValues = range.getValues()[0];
    const rules = range.getDataValidations()[0];
    Object.entries(values).forEach(([name, value]) => {
      const c = col(name);
      if (c > 0) rowValues[c - 1] = fitToDropdown(rules[c - 1], value ?? '');
    });
    range.setValues([rowValues]);

    return json({ ok: true, row });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// If the cell has a dropdown, return the dropdown option that matches the value
// while ignoring quotes/geresh, spaces and leading zeros (e.g. "א'" → "א", "01.11.2026" → "1.11.2026").
function fitToDropdown(rule, value) {
  if (!rule || rule.getCriteriaType() !== SpreadsheetApp.DataValidationCriteria.VALUE_IN_LIST) return value;
  const normalize = (v) => String(v).replace(/['"׳״\s]/g, '').replace(/(^|\D)0+(\d)/g, '$1$2');
  const match = rule.getCriteriaValues()[0].find((option) => normalize(option) === normalize(value));
  return match !== undefined ? match : value;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
