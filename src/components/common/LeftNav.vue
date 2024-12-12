<script setup>

import {ref} from "vue";

const isShowGoodsListMenu = ref(false)

</script>

<template>
  <div data-w-id="cf8eb039-eaca-b0a6-dcaf-08283701695e" class="nav" style="">
    <div class="nav-top">
      <a href="#" class="logo-link w-inline-block">
        <img src="https://assets.website-files.com/63f8cab8b05eed26ffbbdebc/63f8d04370cba89197e76fb0_logo.svg"
             loading="lazy" alt=""></a>
      <div class="nav-separator"></div>
      <div class="nav-menu">
        <div @mouseover="isShowGoodsListMenu = true" @mouseleave="isShowGoodsListMenu = false" class="goods-menu">
          <a :class="isShowGoodsListMenu ? 'w--current' : ''" href="http://localhost:5173/" aria-current="page" class="nav-link w-inline-block">
            <div class="embed-icon w-embed">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-database-fill" viewBox="0 0 16 16">
                <path d="M3.904 1.777C4.978 1.289 6.427 1 8 1s3.022.289 4.096.777C13.125 2.245 14 2.993 14 4s-.875 1.755-1.904 2.223C11.022 6.711 9.573 7 8 7s-3.022-.289-4.096-.777C2.875 5.755 2 5.007 2 4s.875-1.755 1.904-2.223"/>
                <path d="M2 6.161V7c0 1.007.875 1.755 1.904 2.223C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777C13.125 8.755 14 8.007 14 7v-.839c-.457.432-1.004.751-1.49.972C11.278 7.693 9.682 8 8 8s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972"/>
                <path d="M2 9.161V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13s3.022-.289 4.096-.777C13.125 11.755 14 11.007 14 10v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972"/>
                <path d="M2 12.161V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972"/>
              </svg>
            </div>
            <div class="nav-link_text">Hàng Hóa</div>
          </a>

          <div v-if="isShowGoodsListMenu" class="child-goods-menu">
            <a href="http://localhost:5173/" class="nav-link w-inline-block">
              <div class="embed-icon w-embed">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-stars" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"/>
                  <path d="M2.242 2.194a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.28.28 0 0 0-.094.3l.173.569c.078.256-.213.462-.423.3l-.417-.324a.27.27 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.28.28 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.27.27 0 0 0 .259-.194zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.28.28 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.27.27 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.28.28 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.27.27 0 0 0 .259-.194zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.28.28 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.27.27 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.28.28 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.27.27 0 0 0 .259-.194z"/>
                </svg>
              </div>
              <div class="nav-link_text">Danh Sách Hàng</div>
            </a>

            <a href="http://localhost:5173/add-good" class="nav-link w-inline-block">
              <div class="embed-icon w-embed">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-database-fill-add" viewBox="0 0 16 16">
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0M8 1c-1.573 0-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4s.875 1.755 1.904 2.223C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777C13.125 5.755 14 5.007 14 4s-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1"/>
                  <path d="M2 7v-.839c.457.432 1.004.751 1.49.972C4.722 7.693 6.318 8 8 8s3.278-.307 4.51-.867c.486-.22 1.033-.54 1.49-.972V7c0 .424-.155.802-.411 1.133a4.51 4.51 0 0 0-4.815 1.843A12 12 0 0 1 8 10c-1.573 0-3.022-.289-4.096-.777C2.875 8.755 2 8.007 2 7m6.257 3.998L8 11c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13h.027a4.55 4.55 0 0 1 .23-2.002m-.002 3L8 14c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-1.3-1.905"/>
                </svg>
              </div>
              <div class="nav-link_text">Thêm Hàng Mới</div>
            </a>

          </div>
        </div>

        <a href="#" class="nav-link w-inline-block">
        <div class="embed-icon w-embed">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1692_46)">
              <path d="M1.77734 14.0374V8.7041H5.92549" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round"></path>
              <path d="M15.4076 14.0371H0.592773" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round"></path>
              <path d="M5.92578 14.0373V5.14844H10.0739" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round"></path>
              <path d="M14.2224 1.59277H10.0742V14.0372H14.2224V1.59277Z" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
            <defs>
              <clipPath id="clip0_1692_46">
                <rect width="16" height="16" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div class="nav-link_text">Thông Tin SL Thực Tế</div>
      </a><a href="/" class="nav-link w-inline-block">
        <div class="embed-icon w-embed">
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1692_52)">
              <path d="M1.07715 11.9648L8.00023 16.0033L14.9233 11.9648" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M1.07715 8.50391L8.00023 12.5424L14.9233 8.50391" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M1.07715 5.04237L8.00023 9.08083L14.9233 5.04237L8.00023 1.00391L1.07715 5.04237Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
            <defs>
              <clipPath id="clip0_1692_52">
                <rect width="16" height="16.7273" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div class="nav-link_text">Thông Tin SL Thuế</div>
      </a><a href="#" class="nav-link w-inline-block">
        <div class="embed-icon w-embed">
          <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1692_62)">
              <mask id="mask0_1692_62" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="16"
                    height="16">
                <path d="M16 0H0V16H16V0Z" fill="white"></path>
              </mask>
              <g mask="url(#mask0_1692_62)">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M5.99967 0C3.97463 0 2.33301 1.64162 2.33301 3.66667C2.33301 5.69171 3.97463 7.33333 5.99967 7.33333C8.02474 7.33333 9.66634 5.69171 9.66634 3.66667C9.66634 1.64162 8.02474 0 5.99967 0ZM3.66634 3.66667C3.66634 2.378 4.71101 1.33333 5.99967 1.33333C7.28834 1.33333 8.33301 2.378 8.33301 3.66667C8.33301 4.95533 7.28834 6 5.99967 6C4.71101 6 3.66634 4.95533 3.66634 3.66667Z"
                      fill="currentColor"></path>
                <path
                  d="M10.3337 0C9.96546 0 9.66699 0.298477 9.66699 0.666667C9.66699 1.03485 9.96546 1.33333 10.3337 1.33333C11.6223 1.33333 12.667 2.378 12.667 3.66667C12.667 4.95533 11.6223 6 10.3337 6C9.96546 6 9.66699 6.29847 9.66699 6.66667C9.66699 7.03487 9.96546 7.33333 10.3337 7.33333C12.3587 7.33333 14.0003 5.69171 14.0003 3.66667C14.0003 1.64162 12.3587 0 10.3337 0Z"
                  fill="currentColor"></path>
                <path
                  d="M12.722 9.34426C12.8694 9.00686 13.2624 8.85286 13.5998 9.00026C15.0111 9.61686 15.9995 11.0258 15.9995 12.6671V14.0005C15.9995 14.3687 15.701 14.6671 15.3328 14.6671C14.9646 14.6671 14.6662 14.3687 14.6662 14.0005V12.6671C14.6662 11.5747 14.0092 10.6341 13.0659 10.2221C12.7285 10.0747 12.5745 9.6816 12.722 9.34426Z"
                  fill="currentColor"></path>
                <path
                  d="M4 8.66699C1.79086 8.66699 0 10.4579 0 12.667V14.0003C0 14.3685 0.298477 14.667 0.666667 14.667C1.03485 14.667 1.33333 14.3685 1.33333 14.0003V12.667C1.33333 11.1943 2.52724 10.0003 4 10.0003H8C9.47273 10.0003 10.6667 11.1943 10.6667 12.667V14.0003C10.6667 14.3685 10.9651 14.667 11.3333 14.667C11.7015 14.667 12 14.3685 12 14.0003V12.667C12 10.4579 10.2091 8.66699 8 8.66699H4Z"
                  fill="currentColor"></path>
              </g>
            </g>
            <defs>
              <clipPath id="clip0_1692_62">
                <rect width="16" height="15" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div class="nav-link_text">Chênh Lệnh Tồn Kho</div>
      </a>
      </div>
    </div>
    <div class="nav-bot"><a href="#" class="nav-link w-inline-block">
      <div class="embed-icon w-embed">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.00005 11.4347C9.6634 11.4347 11.0118 10.0862 11.0118 8.4229C11.0118 6.75955 9.6634 5.41113 8.00005 5.41113C6.33669 5.41113 4.98828 6.75955 4.98828 8.4229C4.98828 10.0862 6.33669 11.4347 8.00005 11.4347Z"
            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          <path
            d="M12.3549 5.45527C12.5059 5.67154 12.6382 5.90035 12.7502 6.1392L14.3753 7.04273C14.5782 7.95157 14.5803 8.89375 14.3816 9.80351L12.7502 10.707C12.6382 10.9459 12.5059 11.1747 12.3549 11.391L12.3863 13.2545C11.6975 13.8821 10.8824 14.3549 9.99567 14.6412L8.39567 13.6812C8.13248 13.7 7.86827 13.7 7.60508 13.6812L6.01136 14.6349C5.12182 14.3539 4.30399 13.8828 3.61449 13.2545L3.64586 11.3972C3.49607 11.178 3.3639 10.9472 3.25057 10.707L1.62547 9.80351C1.42255 8.89466 1.42041 7.95248 1.6192 7.04273L3.25057 6.1392C3.36256 5.90035 3.49481 5.67154 3.64586 5.45527L3.61449 3.59174C4.30321 2.96415 5.11835 2.49132 6.00508 2.20508L7.60508 3.16508C7.86827 3.14625 8.13248 3.14625 8.39567 3.16508L9.98939 2.21135C10.8789 2.49239 11.6968 2.96339 12.3863 3.59174L12.3549 5.45527Z"
            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </div>
      <div class="nav-link_text">Settings</div>
    </a><a href="#" class="nav-link w-inline-block">
      <div class="embed-icon w-embed">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1692_84)">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M0.0078125 0.0078125H8.49266V1.21993H1.21993V14.5533H8.49266V15.7654H0.0078125V0.0078125ZM11.9516 3.82169L15.9996 7.8698L11.9683 12.237L11.0776 11.415L13.7751 8.49266H3.64418V7.28054H13.6962L11.0944 4.67878L11.9516 3.82169Z"
                  fill="currentColor"></path>
          </g>
          <defs>
            <clipPath id="clip0_1692_84">
              <rect width="16" height="16" fill="white"></rect>
            </clipPath>
          </defs>
        </svg>
      </div>
      <div class="nav-link_text">Logout</div>
    </a></div>
  </div>
</template>

<style scoped>
.nav {
  width: 15%;
  min-height: 100vh;
  min-width: 250px;
  background-color: #e9e5dd;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  position: sticky;
  top: 0;
}

.logo-link {
  margin-top: 45px;
  margin-left: 45px;
}

.w-inline-block {
  max-width: 100%;
  display: inline-block;
}

.nav-separator {
  width: 100%;
  height: 1px;
  background-color: #d7cfbd;
  margin-top: 40px;
  margin-bottom: 40px;
}

.nav-menu {
  padding-left: 25px;
  padding-right: 25px;
}

.nav-bot {
  padding-left: 25px;
  padding-right: 25px;
}

.nav-link {
  grid-column-gap: 14px;
  color: #000;
  border-radius: 7px;
  align-items: center;
  margin-bottom: 10px;
  padding: 13px 20px;
  text-decoration: none;
  transition: color .2s, background-color .2s;
  display: flex;
}

.nav-link:hover, .nav-link.w--current {
  color: #fff;
  background-color: #000;
}

.embed-icon {
  margin-bottom: -3px;
}

svg:not(:root) {
  overflow: hidden;
}

.child-goods-menu {
  font-size: 15px;
  padding: 0 15px;
}
</style>
