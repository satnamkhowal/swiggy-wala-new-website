(function ($) {
  function getFieldConfig($field) {
    if ($field.hasClass("flight-date-field")) {
      return {
        inputSelector: "input.flight-checkin",
        displaySelector: ".flight-selected-date-range",
        emptyLabel: "Departure-Return",
        pendingLabel: "Select return",
        completeLabel: "Departure-Return",
      };
    }

    return {
      inputSelector: "input.hotel-checkin",
      displaySelector: ".hotel-selected-date-range",
      emptyLabel: "Check In-Check Out",
      pendingLabel: "Select check-out",
      completeLabel: "Check In-Check Out",
    };
  }

  function updateFieldDisplay($field, startDate, endDate) {
    const config = getFieldConfig($field);
    const $input = $field.find(config.inputSelector).first();
    const $display = $field.find(config.displaySelector).first();
    const $startDateInput = $field.find(".multi-calendar-start-date").first();
    const $endDateInput = $field.find(".multi-calendar-end-date").first();

    if ($startDateInput.length) {
      $startDateInput.val(startDate || "");
    }

    if ($endDateInput.length) {
      $endDateInput.val(endDate || "");
    }

    if ($input.length) {
      if (startDate && endDate) {
        $input.val(`${moment(startDate).format("DD MMM")}-${moment(endDate).format("DD MMM")}`);
      } else if (startDate) {
        $input.val(moment(startDate).format("DD MMM"));
      } else {
        $input.val("");
      }
    }

    if ($display.length) {
      if (startDate && endDate) {
        $display.html(
          `<strong class="ui-title">${moment(startDate).format("DD MMM")}-${moment(endDate).format("DD MMM")}</strong><span>${config.completeLabel}</span>`,
        );
      } else if (startDate) {
        $display.html(
          `<strong class="ui-title">${moment(startDate).format("DD MMM")}</strong><span>${config.pendingLabel}</span>`,
        );
      } else {
        $display.html(
          `<strong class="ui-title"></strong><span>${config.emptyLabel}</span>`,
        );
      }
    }
  }

  function initRangeCalendar($calendar) {
    if (!$calendar.length) return;

    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    let displayDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );

    let pricingData = [];
    let monthNames = [
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

    if ($calendar.attr("data-dates")) {
      pricingData = JSON.parse($calendar.attr("data-dates") || "[]");
    }

    if ($calendar.attr("data-months-name")) {
      monthNames = JSON.parse($calendar.attr("data-months-name"));
    }

    let startDate = null;
    let endDate = null;

    function getActiveField() {
      if (window.activeRangeDateField && window.activeRangeDateField.length) {
        return window.activeRangeDateField;
      }

      return $calendar.closest(".single-search-box");
    }

    function renderCalendar(date, calendarClass, monthYearClass) {
      const month = date.getMonth();
      const year = date.getFullYear();
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const $monthYear = $calendar.find(`.${monthYearClass}`).first();
      const $calendarDates = $calendar.find(`.${calendarClass}`).first();

      $monthYear.text(`${monthNames[month]} ${year}`);
      $calendarDates.empty();

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let i = 0; i < (firstDay || 7) - 1; i++) {
        $calendarDates.append("<div></div>");
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const dayDate = new Date(year, month, day);
        const formattedDate = `${dayDate.getFullYear()}-${String(
          dayDate.getMonth() + 1,
        ).padStart(2, "0")}-${String(dayDate.getDate()).padStart(2, "0")}`;

        dayDate.setHours(0, 0, 0, 0);
        const priceForDate = getPriceForDate(dayDate, pricingData);
        const isDisabled = dayDate <= currentDate || priceForDate === "-";
        const dateDiv = $(`
          <div data-date="${formattedDate}" class="date ${isDisabled ? "disabled" : ""}">
            <span>${day}</span>
          </div>
        `);

        if (
          day === currentDate.getDate() &&
          month === currentDate.getMonth() &&
          year === currentDate.getFullYear()
        ) {
          dateDiv.addClass("today");
        }

        if (
          startDate &&
          endDate &&
          new Date(formattedDate) >= new Date(startDate) &&
          new Date(formattedDate) <= new Date(endDate)
        ) {
          dateDiv.addClass("in-range");
          if (formattedDate === startDate) {
            dateDiv.addClass("first-range");
          }
          if (formattedDate === endDate) {
            dateDiv.addClass("last-range");
          }
        } else if (formattedDate === startDate || formattedDate === endDate) {
          dateDiv.addClass("is-selected");
        }

        if (dayDate <= today) {
          dateDiv.addClass("disabled").attr("aria-disabled", "true");
        }

        $calendarDates.append(dateDiv);
      }
    }

    function updateCalendars() {
      renderCalendar(displayDate, "hotel-calendar-dates-prev", "hotel-month-year-prev");

      if (window.innerWidth >= 992) {
        const nextMonthDate = new Date(
          displayDate.getFullYear(),
          displayDate.getMonth() + 1,
          1,
        );

        renderCalendar(
          nextMonthDate,
          "hotel-calendar-dates-next",
          "hotel-month-year-next",
        );
        $calendar.find(".hotel-calendar-next").show();
      } else {
        $calendar.find(".hotel-calendar-next").hide();
      }
    }

    function updateInputField() {
      updateFieldDisplay(
        getActiveField(),
        startDate,
        endDate,
      );
    }

    $calendar.on("click", ".prev-month", function (e) {
      e.preventDefault();
      displayDate.setMonth(displayDate.getMonth() - 1);
      updateCalendars();
    });

    $calendar.on("click", ".next-month", function (e) {
      e.preventDefault();
      displayDate.setMonth(displayDate.getMonth() + 1);
      updateCalendars();
    });

    $calendar.on("click", ".calendar .date:not(.disabled)", function (e) {
      e.stopPropagation();
      const selectedDate = $(this).data("date");

      if (!startDate || (startDate && endDate)) {
        startDate = selectedDate;
        endDate = null;
      } else if (!endDate) {
        if (new Date(selectedDate) >= new Date(startDate)) {
          endDate = selectedDate;
        } else {
          startDate = selectedDate;
          endDate = null;
        }
      }

      $(".field-dates__remove").css("display", "flex");
      updateCalendars();
      updateInputField();
    });

    updateCalendars();
  }

  $(document).ready(function () {
    $(".multi-calendar").each(function () {
      initRangeCalendar($(this));
    });
  });
})(jQuery);
