export const getJournals = () => {
  const data = localStorage.getItem("secretbox_journals");

  return data ? JSON.parse(data) : [];
};

export const saveJournal = (journal) => {
  const journals = getJournals();

  journals.unshift(journal);

  localStorage.setItem(
    "secretbox_journals",
    JSON.stringify(journals)
  );
};

export const deleteJournal = (id) => {
  const journals = getJournals();

  const filtered = journals.filter(
    (item) => item.id !== id
  );

  localStorage.setItem(
    "secretbox_journals",
    JSON.stringify(filtered)
  );
};