Dir.glob('./app/routes/posts/**/*.mdx').each do |file_path|
  content = File.read(file_path)

  # 正規表現で置き換え
  content.gsub!(/!\[([^\]]*)\]\(images\/([^\/]+)(?:-(\d+)x(\d+))?\.\w+\)/) do
    alt_text = $1.empty? ? 'alt' : $1
    src = "/static/images/#{$2}"
    if $3 && $4
      src += "-#{$3}x#{$4}.webp"
      width = $3
      height = $4
      "<img src=\"#{src}\" alt=\"#{alt_text}\" width=\"#{width}\" height=\"#{height}\" />"
    else
      src += ".webp"
      "<img src=\"#{src}\" alt=\"#{alt_text}\" />"
    end
  end

  # ファイルに書き戻す
  File.write(file_path, content)
end
