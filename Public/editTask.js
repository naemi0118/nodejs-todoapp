const taskIdDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const singleTaskDOM = document.querySelector(".single-task-form");
const formAlertDOM = document.querySelector(".form-alert");
const taskCompletedDOM = document.querySelector(".task-edit-completed");

const params = new URLSearchParams(window.location.search); // URLSearchParamsオブジェクトを作成

const id = params.get("id"); // クエリパラメータの "id" の値を取得
console.log(id); // "id番号" が出力される

// const params = window.location.search;
// const id = params.replace("?", "");
// console.log(id);

// 一つの特定のタスクを取得する
const showTask = async () => {
  try {
    const { data: tasks } = await axios.get(`/api/v1/tasks/?id=${id}`); // `/api/v1/tasks/${id}` でOK
    console.log(tasks);
    // id に一致するタスクを見つける
    const first = tasks.find((aaa) => aaa._id === id);
    console.log(first);
    const { completed, _id, name } = first;
    console.log(completed);
    console.log(_id);
    console.log(name);
    taskIdDOM.textContent = _id;
    taskNameDOM.value = name;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
  } catch (err) {
    console.log(err);
  }
};
showTask();

// タスクの編集
singleTaskDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const taskName = taskNameDOM.value;
    const taskChecked = taskCompletedDOM.checked;
    console.log(taskName);
    const { data: tasks } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskChecked,
    });
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = "編集に成功しました！";
    formAlertDOM.classList.add("text-success");
  } catch (err) {
    console.log(err);
  }

  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.textContent = "編集に成功しました！";
    formAlertDOM.classList.add("text-success");
  }, 3000);
});
