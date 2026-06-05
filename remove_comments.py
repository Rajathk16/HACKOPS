import os
import re

def remove_js_comments(text):
    
    pattern = re.compile(
        r'(?P<comment>//.*?$|/\*.*?\*/)|(?P<string>"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'|`(?:\\.|[^`\\])*`)',
        re.DOTALL | re.MULTILINE
    )
    def replacer(match):
        if match.group('comment'):
            return ""
        return match.group('string')
    return pattern.sub(replacer, text)

def remove_python_comments(text):
    
    
    
    pattern = re.compile(
        r'(?P<comment>#[^\n]*)|(?P<string>"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'|"""(?:\\.|[^\\])*?"""|\'\'\'(?:\\.|[^\\])*?\'\'\')',
        re.DOTALL | re.MULTILINE
    )
    def replacer(match):
        if match.group('comment'):
            return ""
        return match.group('string')
    return pattern.sub(replacer, text)

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.git' in dirs:
            dirs.remove('.git')
            
        for file in files:
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original = content
                if file.endswith(('.js', '.jsx')):
                    content = remove_js_comments(content)
                elif file.endswith('.py'):
                    content = remove_python_comments(content)
                
                if content != original:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Removed comments in: {filepath}")
            except Exception as e:
                print(f"Error processing {filepath}: {e}")

if __name__ == "__main__":
    process_directory("E:/work_nonsense/PES/HACKOPS")
