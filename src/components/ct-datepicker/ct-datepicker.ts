import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import '../ct-icon';
import '../ct-button';

/**
 * A custom Datepicker component for the CashTrack Design System.
 */
@customElement('ct-datepicker')
export class CtDatepicker extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String }) value = '';
  @property({ type: String }) error = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) min = '';
  @property({ type: String }) max = '';
  @property({ type: String }) format: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY/MM/DD' = 'DD/MM/YYYY';
  @property({ type: String }) locale = 'pt-BR';

  @state() private _focused = false;
  @property({ type: Boolean, reflect: true, attribute: 'data-open' }) _isOpen = false;
  @state() private _currentMonth = new Date();
  @state() private _displayValue = '';
  @state() private _internalError = '';
  @state() private _calendarView: 'days' | 'months' | 'years' = 'days';
  @state() private _decadeStart = Math.floor(new Date().getFullYear() / 10) * 10;

  @query('.calendar-dropdown') private dropdown!: HTMLElement;
  @query('.input-container') private inputContainer!: HTMLElement;
  @query('input') private inputEl!: HTMLInputElement;

  private _boundClickOutside = this._handleClickOutside.bind(this);

  static styles = css`
    :host {
      display: block;
      font-family: var(--ct-font-family, 'Montserrat', sans-serif);
      margin-bottom: 16px;
      position: relative;
      z-index: 1;
    }

    :host([data-open]) {
      z-index: 100;
    }

    .input-container {
      position: relative;
      background: var(--ct-surface, #1E1E1E);
      backdrop-filter: var(--ct-surface-blur, blur(24px));
      -webkit-backdrop-filter: var(--ct-surface-blur, blur(24px));
      border: 1px solid var(--ct-border-color, #333333);
      border-radius: var(--ct-radius-md, 8px);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
    }

    .input-container:hover:not(.disabled) {
      border-color: var(--ct-text-secondary, #B3B3B3);
    }

    .input-container.focused, .input-container.open {
      border-color: var(--ct-color-primary, #00E5FF);
      box-shadow: 0 0 0 1px var(--ct-color-primary, #00E5FF), 0 0 8px rgba(0, 229, 255, 0.2);
    }

    .input-container.error {
      border-color: var(--ct-color-error, #F44336);
    }

    .input-container.error.focused, .input-container.error.open {
      box-shadow: 0 0 0 1px var(--ct-color-error, #F44336), 0 0 8px rgba(244, 67, 54, 0.2);
    }

    .input-container.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    input {
      flex: 1;
      width: 100%;
      background: transparent;
      border: none;
      color: var(--ct-text-primary, #FFFFFF);
      font-family: inherit;
      font-size: 16px;
      padding: 24px 16px 8px 16px;
      outline: none;
    }

    input:disabled {
      cursor: not-allowed;
    }

    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 16px;
      color: var(--ct-text-secondary, #B3B3B3);
      cursor: pointer;
      transition: color 0.2s ease;
    }

    .icon-container:hover {
      color: var(--ct-text-primary, #FFFFFF);
    }

    .label {
      position: absolute;
      left: 16px;
      top: 16px;
      color: var(--ct-text-secondary, #B3B3B3);
      font-size: 16px;
      pointer-events: none;
      transition: all 0.2s ease;
      transform-origin: left top;
    }

    .input-container.focused .label,
    .input-container.open .label,
    .input-container.has-value .label {
      transform: translateY(-10px) scale(0.75);
      color: var(--ct-color-primary, #00E5FF);
    }

    .input-container.error .label {
      color: var(--ct-color-error, #F44336);
    }

    .input-container:not(.focused):not(.open).has-value .label {
      color: var(--ct-text-secondary, #B3B3B3);
    }

    .error-message {
      color: var(--ct-color-error, #F44336);
      font-size: 12px;
      margin-top: 4px;
      margin-left: 4px;
    }

    /* Custom Calendar Dropdown */
    .calendar-dropdown {
      position: fixed;
      margin: 0;
      width: 300px;
      background: var(--ct-surface, #1E1E1E);
      backdrop-filter: var(--ct-surface-blur, blur(32px));
      -webkit-backdrop-filter: var(--ct-surface-blur, blur(32px));
      border: 1px solid var(--ct-border-color, #333333);
      border-radius: var(--ct-radius-md, 8px);
      padding: 16px;
      z-index: 99999;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      flex-direction: column;
      user-select: none;
      /* default hidden state for popover */
      display: none;
    }

    .calendar-dropdown:popover-open {
      display: flex;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      color: var(--ct-text-primary);
    }

    .current-month {
      font-weight: 600;
      text-transform: capitalize;
      font-size: 16px;
      display: flex;
      gap: 4px;
    }

    .clickable-header {
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      transition: background 0.2s ease;
    }

    .clickable-header:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .calendar-weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
      color: var(--ct-text-secondary);
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .calendar-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
    }

    .calendar-grid-large {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-top: 8px;
    }

    .day {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 36px;
      border-radius: var(--ct-radius-md, 8px);
      color: var(--ct-text-primary);
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s ease;
    }

    .day:hover:not(.disabled) {
      background: rgba(255, 255, 255, 0.1);
    }

    .grid-item-large {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 48px;
      border-radius: var(--ct-radius-md, 8px);
      color: var(--ct-text-primary);
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s ease;
      background: transparent;
      text-transform: capitalize;
    }

    .grid-item-large:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .day.other-month {
      color: var(--ct-text-secondary);
      opacity: 0.5;
    }

    .day.selected, .grid-item-large.selected {
      background: var(--ct-color-primary);
      color: #000;
      font-weight: 600;
    }

    .day.today:not(.selected) {
      border: 1px solid var(--ct-color-primary);
    }

    .day.disabled {
      opacity: 0.2;
      cursor: not-allowed;
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('mousedown', this._boundClickOutside);
    if (this.value) {
      this._displayValue = this._formatToDisplay(this.value);
      const parsed = this._parseToDate(this.value);
      if (parsed) this._currentMonth = new Date(parsed.getFullYear(), parsed.getMonth(), 1);
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('mousedown', this._boundClickOutside);
  }

  override updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('value')) {
      const formatted = this._formatToDisplay(this.value);
      if (this._displayValue !== formatted) {
        this._displayValue = formatted;
        this._validateDateString(this._displayValue);
      }
    }
  }

  private _handleClickOutside(e: MouseEvent) {
    if (this._isOpen && !this.contains(e.target as Node) && !this.dropdown.contains(e.target as Node)) {
      this._closeCalendar();
    }
  }

  private _closeCalendar() {
    this._isOpen = false;
    this.dropdown.hidePopover();
    this._validateDateString(this._displayValue);
    window.removeEventListener('scroll', this._boundUpdatePosition, true);
    window.removeEventListener('resize', this._boundUpdatePosition);
  }

  private _boundUpdatePosition = this._updatePosition.bind(this);

  private _updatePosition() {
    if (!this._isOpen) return;
    const rect = this.inputContainer.getBoundingClientRect();
    this.dropdown.style.top = `${rect.bottom + 8}px`;
    this.dropdown.style.left = `${rect.left}px`;
  }

  // Other internal methods
  private _formatToDisplay(isoDate: string) {
    if (!isoDate) return '';
    const parts = isoDate.split('-');
    if (parts.length === 3) {
      if (this.format === 'MM/DD/YYYY') return `${parts[1]}/${parts[2]}/${parts[0]}`;
      if (this.format === 'YYYY/MM/DD') return `${parts[0]}/${parts[1]}/${parts[2]}`;
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return isoDate;
  }

  private _parseToISO(displayDate: string) {
    if (!displayDate) return '';
    const parts = displayDate.split('/');
    if (parts.length === 3) {
      if (this.format === 'MM/DD/YYYY' && parts[2].length === 4) return `${parts[2]}-${parts[0]}-${parts[1]}`;
      if (this.format === 'YYYY/MM/DD' && parts[0].length === 4) return `${parts[0]}-${parts[1]}-${parts[2]}`;
      if (this.format === 'DD/MM/YYYY' && parts[2].length === 4) return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return '';
  }

  private _parseToDate(isoDate: string) {
    if (!isoDate) return null;
    const parts = isoDate.split('-');
    if (parts.length === 3) {
      const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      if (!isNaN(d.getTime())) return d;
    }
    return null;
  }

  private _handleFocus() {
    this._focused = true;
  }

  private _handleBlur() {
    this._focused = false;
    if (!this._isOpen) {
      this._validateDateString(this._displayValue);
    }
  }

  private _toggleCalendar(e: Event) {
    e.stopPropagation();
    if (this.disabled) return;
    
    if (this._isOpen) {
      this._closeCalendar();
      return;
    }

    this._isOpen = true;
    const parsed = this._parseToDate(this.value);
    if (parsed) {
      this._currentMonth = new Date(parsed.getFullYear(), parsed.getMonth(), 1);
    }
    
    this.dropdown.showPopover();
    this._updatePosition();
    
    window.addEventListener('scroll', this._boundUpdatePosition, true);
    window.addEventListener('resize', this._boundUpdatePosition);
    
    this.inputEl?.focus();
  }

  private _handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    let val = target.value.replace(/\D/g, '');
    
    // Auto format based on chosen format
    if (this.format === 'YYYY/MM/DD') {
      if (val.length > 4) val = val.substring(0, 4) + '/' + val.substring(4);
      if (val.length > 7) val = val.substring(0, 7) + '/' + val.substring(7, 9);
    } else {
      if (val.length > 2) val = val.substring(0, 2) + '/' + val.substring(2);
      if (val.length > 5) val = val.substring(0, 5) + '/' + val.substring(5, 9);
    }
    
    this._displayValue = val;
    target.value = val;
    
    this._validateDateString(val);
  }

  private _validateDateString(displayDate: string) {
    if (!displayDate) {
      this.value = '';
      this._internalError = '';
      this._dispatchChange();
      return;
    }

    if (displayDate.length !== 10) {
      this._internalError = 'Data inválida';
      return;
    }

    const isoDate = this._parseToISO(displayDate);
    const dateObj = this._parseToDate(isoDate);

    if (!dateObj || isoDate === '') {
      this._internalError = 'Data inválida';
      return;
    }

    // Verify if it is a real date (e.g. not 31/02)
    const formattedBack = this._formatToDisplay(`${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`);
    if (formattedBack !== displayDate) {
      this._internalError = 'Data inválida';
      return;
    }

    // Check min/max bounds
    if (this.min && isoDate < this.min) {
      this._internalError = `A data deve ser maior ou igual a ${this._formatToDisplay(this.min)}`;
      return;
    }
    if (this.max && isoDate > this.max) {
      this._internalError = `A data deve ser menor ou igual a ${this._formatToDisplay(this.max)}`;
      return;
    }

    this._internalError = '';
    
    if (this.value !== isoDate) {
      this.value = isoDate;
      this._currentMonth = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
      this._dispatchChange();
    }
  }

  private _dispatchChange() {
    this.dispatchEvent(new CustomEvent('ct-change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  private _prevMonth(e: Event) {
    e.stopPropagation();
    if (this._calendarView === 'days') {
      this._currentMonth = new Date(this._currentMonth.getFullYear(), this._currentMonth.getMonth() - 1, 1);
    } else if (this._calendarView === 'months') {
      this._currentMonth = new Date(this._currentMonth.getFullYear() - 1, this._currentMonth.getMonth(), 1);
    } else {
      this._decadeStart -= 12;
    }
  }

  private _nextMonth(e: Event) {
    e.stopPropagation();
    if (this._calendarView === 'days') {
      this._currentMonth = new Date(this._currentMonth.getFullYear(), this._currentMonth.getMonth() + 1, 1);
    } else if (this._calendarView === 'months') {
      this._currentMonth = new Date(this._currentMonth.getFullYear() + 1, this._currentMonth.getMonth(), 1);
    } else {
      this._decadeStart += 12;
    }
  }

  private _selectMonth(monthIndex: number, e: Event) {
    e.stopPropagation();
    this._currentMonth = new Date(this._currentMonth.getFullYear(), monthIndex, 1);
    this._calendarView = 'days';
  }

  private _selectYear(year: number, e: Event) {
    e.stopPropagation();
    this._currentMonth = new Date(year, this._currentMonth.getMonth(), 1);
    this._calendarView = 'months';
  }

  private _selectDay(dayInfo: any, e: Event) {
    e.stopPropagation();
    if (dayInfo.disabled) return;
    
    const d = new Date(dayInfo.year, dayInfo.month, dayInfo.date);
    const isoDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    
    this.value = isoDate;
    this._displayValue = this._formatToDisplay(isoDate);
    this._internalError = '';
    this._closeCalendar();
    this._dispatchChange();
  }

  private _generateDays() {
    const year = this._currentMonth.getFullYear();
    const month = this._currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startingDayOfWeek = firstDay.getDay(); 
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push(this._createDayInfo(year, month - 1, prevMonthLastDay - i, true, today));
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(this._createDayInfo(year, month, i, false, today));
    }
    
    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(this._createDayInfo(year, month + 1, i, true, today));
    }
    
    return days;
  }

  private _createDayInfo(y: number, m: number, d: number, isOtherMonth: boolean, today: Date) {
    const dateObj = new Date(y, m, d);
    const isoDate = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
    
    let disabled = false;
    if (this.min && isoDate < this.min) disabled = true;
    if (this.max && isoDate > this.max) disabled = true;
    
    return {
      date: dateObj.getDate(),
      month: dateObj.getMonth(),
      year: dateObj.getFullYear(),
      isOtherMonth,
      isSelected: this.value === isoDate,
      isToday: dateObj.getTime() === today.getTime(),
      disabled
    };
  }

  private _renderHeaderContent() {
    if (this._calendarView === 'days') {
      const monthName = new Intl.DateTimeFormat(this.locale, { month: 'long' }).format(this._currentMonth);
      return html`
        <span class="clickable-header" @click="${(e: Event) => { e.stopPropagation(); this._calendarView = 'months'; }}">${monthName}</span>
        <span class="clickable-header" @click="${(e: Event) => { e.stopPropagation(); this._calendarView = 'years'; this._decadeStart = Math.floor(this._currentMonth.getFullYear() / 12) * 12; }}">${this._currentMonth.getFullYear()}</span>
      `;
    } else if (this._calendarView === 'months') {
      return html`
        <span class="clickable-header" @click="${(e: Event) => { e.stopPropagation(); this._calendarView = 'years'; this._decadeStart = Math.floor(this._currentMonth.getFullYear() / 12) * 12; }}">${this._currentMonth.getFullYear()}</span>
      `;
    } else {
      return html`
        <span>${this._decadeStart} - ${this._decadeStart + 11}</span>
      `;
    }
  }

  private _renderCalendarContent() {
    if (this._calendarView === 'years') {
      const years = Array.from({ length: 12 }, (_, i) => this._decadeStart + i);
      const selectedYear = this.value ? this._parseToDate(this.value)?.getFullYear() : null;
      return html`
        <div class="calendar-grid-large">
          ${years.map(y => html`
            <div class="grid-item-large ${y === selectedYear ? 'selected' : ''}" @click="${(e: Event) => this._selectYear(y, e)}">
              ${y}
            </div>
          `)}
        </div>
      `;
    } else if (this._calendarView === 'months') {
      const months = Array.from({ length: 12 }, (_, i) => {
        return new Intl.DateTimeFormat(this.locale, { month: 'short' }).format(new Date(2000, i, 1)).replace('.', '');
      });
      const selectedMonth = this.value ? this._parseToDate(this.value)?.getMonth() : null;
      return html`
        <div class="calendar-grid-large">
          ${months.map((m, i) => html`
            <div class="grid-item-large ${i === selectedMonth && this._currentMonth.getFullYear() === this._parseToDate(this.value)?.getFullYear() ? 'selected' : ''}" @click="${(e: Event) => this._selectMonth(i, e)}">
              ${m}
            </div>
          `)}
        </div>
      `;
    } else {
      const days = this._generateDays();
      // Jan 2, 2000 was Sunday
      const weekdays = Array.from({ length: 7 }, (_, i) => {
        return new Intl.DateTimeFormat(this.locale, { weekday: 'narrow' }).format(new Date(2000, 0, 2 + i));
      });
      
      return html`
        <div class="calendar-weekdays">
          ${weekdays.map(w => html`<span>${w}</span>`)}
        </div>
        <div class="calendar-days">
          ${days.map(d => html`
            <div 
              class="day ${d.isOtherMonth ? 'other-month' : ''} ${d.isSelected ? 'selected' : ''} ${d.isToday ? 'today' : ''} ${d.disabled ? 'disabled' : ''}" 
              @click="${(e: Event) => this._selectDay(d, e)}"
            >
              ${d.date}
            </div>
          `)}
        </div>
      `;
    }
  }

  render() {
    const hasValue = this._displayValue && this._displayValue.length > 0;
    const finalError = this._internalError || this.error;
    
    const containerClasses = [
      'input-container',
      this._focused ? 'focused' : '',
      this._isOpen ? 'open' : '',
      hasValue ? 'has-value' : '',
      finalError ? 'error' : '',
      this.disabled ? 'disabled' : ''
    ].join(' ');

    return html`
      <div class="${containerClasses}" part="container" @click="${() => this.inputEl?.focus()}">
        <label class="label" part="label">${this.label}</label>
        <input
          type="text"
          placeholder="${this._focused || this._isOpen ? this.format : ''}"
          .value="${live(this._displayValue)}"
          ?disabled="${this.disabled}"
          @focus="${this._handleFocus}"
          @blur="${this._handleBlur}"
          @input="${this._handleInput}"
          maxlength="10"
          part="input"
        />
        <div class="icon-container" @click="${this._toggleCalendar}" part="icon">
          <!-- O ÍCONE FOI AUMENTADO DE ACORDO COM O PEDIDO (size 24px ou mais) -->
          <ct-icon name="calendar_today" size="24px"></ct-icon>
        </div>
      </div>
      
      ${finalError ? html`<div class="error-message" part="error">${finalError}</div>` : ''}

      <div class="calendar-dropdown" popover="manual">
        <div class="calendar-header">
          <ct-button variant="text" style="padding: 4px;" @click="${this._prevMonth}">
            <ct-icon name="chevron_left" size="20px"></ct-icon>
          </ct-button>
          <div class="current-month">
            ${this._renderHeaderContent()}
          </div>
          <ct-button variant="text" style="padding: 4px;" @click="${this._nextMonth}">
            <ct-icon name="chevron_right" size="20px"></ct-icon>
          </ct-button>
        </div>
        ${this._renderCalendarContent()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-datepicker': CtDatepicker;
  }
}
