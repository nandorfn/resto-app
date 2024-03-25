const emptyPage = () => `
<div>
<img class="h-fluid w-fluid" src='./images/vector/empty.jpg' height="100" width="100" alt="empty" />
<h4 class="text-center w-full mt-5">Your favorite list is empty</h4>
</div>
`;

const error404 = () => `
<div class="mt-5">
<img class="h-fluid w-fluid" src='./images/vector/404.jpg' height="100" width="100" alt="empty" />
<h4 class="text-center w-full mt-5">Cannot get data!</h4>
</div>
`;

export { emptyPage, error404 };
