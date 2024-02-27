document.addEventListener("DOMContentLoaded", function () {
  const leftColumn = document.getElementById("leftColumn");
  const resizer = document.getElementById("resizer");
  const rightColumn = document.getElementById("rightColumn");

  let isResizing = false;

  // asider拖拽的范围
  const AsiderMaxWidth = 800
  const AsiderMinWidth = 200

  /**
   * mousedown handler
   */
  resizer.addEventListener("mousedown", function (e) {
    resizer.style.backgroundColor = '#99db16'
    console.log('@@@ mouse down: ', e);

    isResizing = true;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResizing);
  });


  /**
   * mousemove handler
   */
  function handleMouseMove(e) {
    console.log('### mouse move: ', e);
    const leftColumnWidth = e.clientX >= AsiderMaxWidth ? AsiderMaxWidth : e.clientX <= AsiderMinWidth ? AsiderMinWidth : e.clientX;
    leftColumn.style.width = `${leftColumnWidth}px`;
    rightColumn.style.width = `calc(100% - ${leftColumnWidth}px)`;

    /**
     * 防止在moving过程中取消鼠标左键
     * 如果在拖拽过程中放开了鼠标，此时直接执行mouseup后的逻辑，停止拖拽
     * event.which == 1 代表鼠标左键按下 == 0 代表放开了鼠标按下
     */
    if (e.which === 0) {
      stopResizing(e)
    }
  }

  /**
   * mouseup handler
   */
  function stopResizing(e) {
    console.log('&&& mouse up: ', e);
    resizer.style.backgroundColor = '#3498db'
    isResizing = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResizing);

    // 防止卡顿
    requestAnimationFrame(function () {
      leftColumn.style.transition = "width 0.3s";
      rightColumn.style.transition = "width 0.3s";
      console.log(new Date());
    });

  }
});
