
(function ($) {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const defaultMonthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function initializeTourCalendar($tourCalendar) {
    if ($tourCalendar.data("tourCalendarInitialized")) return;

    $tourCalendar.data("tourCalendarInitialized", true);

    let displayDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    let startDate = null;
    let monthNames = defaultMonthNames;

    if ($tourCalendar.attr("data-months-name")) {
      monthNames = JSON.parse($tourCalendar.attr("data-months-name"));
    }

    function getActiveDateField() {
      const $dateField = $tourCalendar.closest(".date-field, .atp-date-field");

      if ($dateField.length) {
        return $dateField;
      }

      const $inlineDateField = $tourCalendar.closest(".form-inner");

      if (
        $inlineDateField.length &&
        $inlineDateField.find(".date-field-area").length
      ) {
        return $inlineDateField;
      }

      return $();
    }

    function getActiveDateElements() {
      const $activeDateField = getActiveDateField();

      return {
        $activeDateField,
        $tourDateField: $activeDateField
          .find('.custom-select-dropdown input[type="text"], .date-field-area input[type="text"]')
          .first(),
        $tourDisplay: $activeDateField.find(".selected-date").first(),
      };
    }

    function renderCalendar(date, calendarDatesClass, monthYearClass) {
      const month = date.getMonth();
      const year = date.getFullYear();
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      $tourCalendar.find(`.${monthYearClass}`).text(`${monthNames[month]} ${year}`);
      $tourCalendar.find(`.${calendarDatesClass}`).empty();

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let i = 0; i < (firstDay || 7) - 1; i++) {
        $tourCalendar.find(`.${calendarDatesClass}`).append("<div></div>");
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const dayDate = new Date(year, month, day);
        const formattedDate = `${dayDate.getFullYear()}-${String(
          dayDate.getMonth() + 1
        ).padStart(2, "0")}-${String(dayDate.getDate()).padStart(2, "0")}`;
        const $dateDiv = $(`
          <div class="date" data-date="${formattedDate}">
            <span>${day}</span>
          </div>
        `);

        if (
          day === currentDate.getDate() &&
          month === currentDate.getMonth() &&
          year === currentDate.getFullYear()
        ) {
          $dateDiv.addClass("today");
        }

        if (formattedDate === startDate) {
          $dateDiv.addClass("is-selected");
        }

        if (dayDate <= today) {
          $dateDiv.addClass("disabled").attr("aria-disabled", "true");
        }

        $tourCalendar.find(`.${calendarDatesClass}`).append($dateDiv);
      }
    }

    function updateCalendars() {
      renderCalendar(displayDate, "tour-calendar-dates-prev", "tour-month-year-prev");

      if (window.innerWidth >= 768) {
        const nextMonthDate = new Date(
          displayDate.getFullYear(),
          displayDate.getMonth() + 1,
          1
        );
        renderCalendar(nextMonthDate, "tour-calendar-dates-next", "tour-month-year-next");
        $tourCalendar.find(".tour-calendar-next").show();
      } else {
        $tourCalendar.find(".tour-calendar-next").hide();
      }
    }

    function updateInputField(formattedDate) {
      const formattedLabel = moment(formattedDate).format("D MMMM");
      const formattedMeta = moment(formattedDate).format("dddd YYYY");
      const { $tourDateField, $tourDisplay } = getActiveDateElements();

      if ($tourDateField.length) {
        $tourDateField.val(formattedDate);
      }

      if ($tourDisplay.length) {
        $tourDisplay.html(`<strong class="ui-title">${formattedLabel}</strong><span>${formattedMeta}</span>`);
      }
    }

    $tourCalendar.on("click", ".prev-month", function (e) {
      e.preventDefault();
      displayDate.setMonth(displayDate.getMonth() - 1);
      updateCalendars();
    });

    $tourCalendar.on("click", ".next-month", function (e) {
      e.preventDefault();
      displayDate.setMonth(displayDate.getMonth() + 1);
      updateCalendars();
    });

    $tourCalendar.on("click", ".calendar .date:not(.disabled)", function () {
      const selectedDate = $(this).attr("data-date");
      const isInlineDateFieldCalendar = getActiveDateField()
        .find(".date-field-area")
        .length > 0;
      const formattedDate = isInlineDateFieldCalendar
        ? moment(selectedDate).format("D MMMM YYYY")
        : new Date(selectedDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          });

      startDate = selectedDate;

      $tourCalendar.find(".calendar .date").removeClass("today is-selected");
      $(this).addClass("is-selected");

      updateInputField(formattedDate);
    });

    updateCalendars();
  }

  window.initializeTourCalendar = initializeTourCalendar;

  $(document).ready(function () {
    $(".single-calendar").each(function () {
      initializeTourCalendar($(this));
    });
  });
})(jQuery);
