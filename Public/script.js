const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

// /api/v1/tasksからタスクを読み込む
const showTasks = async () => {
  try {
    // 自作のAPIを叩く
    const { data: tasks } = await axios.get("/api/v1/tasks");
    console.log(tasks);

    // タスクが一つもない場合
    if (tasks.length < 1) {
      tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありません</h5>`;
      return;
    }

    // 一つ一つタスクを取り出す = map関数
    const allTasks = tasks
      .map((task) => {
        const { completed, _id, name } = task;
        console.log(task.name);

        return `<div class="single-task ${completed && "task-completed"}">
          <div class="single-task-area">
            <h5>
              <span><i class="far fa-check-circle ${
                completed && "fa-check-circled"
              }"></i></span>${task.name}
            </h5>
            <div class="task-link">
              <!-- 編集リンクを書いておく -->
              <a href="edit.html?id=${_id}" class="edit-link">
              <i class="fas fa-edit"></i>
              </a>
              <!-- ゴミ箱リンク -->
              <button type="button" class="device-button" data-id="${_id}">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
`;
      })
      .join("");
    tasksDOM.innerHTML = allTasks;
  } catch (err) {
    console.log(err);
  }
};

showTasks();

// タスクを新規作成する
formDOM.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = taskInputDOM.value;

  try {
    // 自作のAPIを叩く
    await axios.post("/api/v1/tasks", { name: name });
    showTasks();
    taskInputDOM.value = "";
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = "タスクを追加しました";
    formAlertDOM.classList.add("text-success");
  } catch (err) {
    console.log(err);
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = "タスク名は20文字以内で入力してください";
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});

// タスクを削除する
tasksDOM.addEventListener("click", async (event) => {
  const element = event.target;
  if (element.parentElement.classList.contains("device-button") === true) {
    const id = element.parentElement.dataset.id;
    try {
      // 自作のAPIを叩く
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (err) {
      console.log(err);
    }
  }
});

// element.classList.contains('クラス名') は、対象の要素(element)にクラス名が含まれているかを判定する

// dataset.id は、data-以降の部分(id)をキー名にその値を取得する
