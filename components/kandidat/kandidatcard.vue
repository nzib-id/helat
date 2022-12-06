<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="3"
    hide-default-footer
  >
    <template v-slot:body="{ items }">
      <tbody>
        <tr
          class="font-weight-bold text-capitalize"
          v-for="item in items"
          :key="item.status"
        >
          <td>
            <v-avatar color="grey" class="pa-2 mr-3" size="31">
              {{ item.name }} </v-avatar
            >{{ item.name }}
          </td>
          <td>{{ item.dapil }}</td>
          <td>{{ item.kampanye }}</td>
          <td>{{ item.budget }}</td>
          <td>
            <v-btn
              color="rgba(22, 192, 152, 0.2)"
              class="success--text caption font-weight-bold"
              depressed
              small
              >{{ item.status }}
            </v-btn>
            <v-btn color="error" value="disable" icon x-small>
              <v-icon>mdi-block-helper</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'Nama', value: 'name' },
        { text: 'Dapil', value: 'dapil' },
        { text: 'Kampanye', value: 'kampanye' },
        { text: 'Budget', value: 'budget' },
        { text: 'Status', value: 'status' },
      ],
      items: [
        {
          name: 'Jajang Nurjaman',
          dapil: 'IV Jawa Barat',
          kampanye: '10',
          budget: '100%',
          status: 'approved',
        },
        {
          name: 'Udin Saepudin',
          dapil: 'V Jawa Barat',
          kampanye: '7',
          budget: '95%',
          status: 'unapproved',
        },
        {
          name: 'Leo Markus',
          dapil: 'II Jawa Barat',
          kampanye: '10',
          budget: '89%',
          status: 'approved',
        },
      ],
    }
  },
  computed: {
    title() {
      return this.$store.state.kandidat.title
    },
  },
}
</script>
