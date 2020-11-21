<tr>
    <td>
        <input type="checkbox" data-cartid="{{cartId}}">
    </td>
    <td>
        <span>{{cartId}}</span>
    </td>
    <td>
        <a href="{{link}}" target="_blank">
            <img src="{{img}}" alt="{{name}}">
        </a>
    </td>
    <td>
        <a href="{{link}}" target="_blank">
            {{name}}
        </a>
    </td>
    <td>
        <span class="price">￥{{price}}.00</span>
    </td>
    <td>
        {{version}}
    </td>
    <td>{{color}}</td>
    <td>
        <button class="purchase-btn J_purchaseBtn" data-cartid="{{cartId}}">结算</button>
    </td>
    <td>
        <a class="javascript:;" class="J_removeBtn" data-cartid="{{cartId}}">删除</a>
    </td>
</tr>