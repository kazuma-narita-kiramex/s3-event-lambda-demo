ローカル実行

```
# s3イベントのモックを作成
sls generate-event -t aws:s3 | jq . > event/s3.json
# ローカル実行
sls invoke local -f s3Func -p event/s3.json
```
