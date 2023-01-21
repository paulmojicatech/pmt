import { useState } from "react"

export default function GroceryList() {
    const [items, setItems] = useState<{datePurchased: string, name: string; qty: number}[]>([]);
    
    return (
        <main>
            <section>

                <table>
                    <thead>
                        <th>
                            Date Purchased
                        </th>
                        <th>
                            Item
                        </th>
                        <th>
                            Qty
                        </th>
                    </thead>
                    <tbody>
                        {
                            items.map(item => (
                                <>
                                <td>
                                    {item.datePurchased}
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    {item.qty}
                                </td>
                                </>
                            ))
                        }
                    </tbody>
                </table>
            </section>
            
        </main>
    )
}